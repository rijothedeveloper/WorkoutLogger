const db = require("../db");
class Workout {
  async getAllWorkouts(equipment, muscles, name) {
    let filter = false;
    let query = "SELECT * FROM workout";
    if (equipment) {
      if (!filter) {
        query = query + " where";
      }
      filter = true;
      query = query + ` equipment = ${await this.getEquipmentId(equipment)}`;
    }
    if (muscles) {
      if (!filter) {
        query = query + " where";
      } else {
        query += " AND";
      }
      filter = true;
      query += ` muscles = ${await this.getMuscleId(muscles)}`;
    }
    if (name) {
      if (!filter) {
        query = query + " where";
      } else {
        query += " AND";
      }
      filter = true;
      query += ` name LIKE '%${name}%'`;
    }
    const workoutsRes = await db.query(query);
    const workouts = workoutsRes.rows;
    for (let workout of workouts) {
      const muscles = await db.query(
        `SELECT muscle_id, name FROM workout_muscles INNER JOIN muscles on workout_muscles.muscle_id = muscles.id WHERE workout_id = ${workout.id}`
      );
      workout["musles"] = muscles.rows;
      const equipments = await db.query(
        `SELECT equipment_id, name FROM workout_equipments INNER JOIN equipments on workout_equipments.equipment_id = equipments.id WHERE workout_id = ${workout.id}`
      );
      workout["equipments"] = equipments.rows;
    }
    return workouts;
  }

  async getWorkout(id) {
    const result = await db.query(`SELECT * FROM workout WHERE id=$1`, [id]);
    if (result.rows.length > 0) {
      const workout = result.rows[0];
      const muscles = await db.query(
        `SELECT muscle_id, name FROM workout_muscles INNER JOIN muscles on workout_muscles.muscle_id = muscles.id WHERE workout_id = ${workout.id}`
      );
      workout["musles"] = muscles.rows;
      const equipments = await db.query(
        `SELECT equipment_id, name FROM workout_equipments INNER JOIN equipments on workout_equipments.equipment_id = equipments.id WHERE workout_id = ${workout.id}`
      );
      workout["equipments"] = equipments.rows;
      return workout;
    } else {
      return false;
    }
  }

  async getEquipmentId(equipment) {
    if (!equipment) return null;
    const equipmentresults = await db.query(
      `SELECT id FROM equipments WHERE name=$1`,
      [equipment]
    );
    if (!equipmentresults.rows.length) return null;
    const categoryId = equipmentresults.rows[0].id;
    return categoryId;
  }

  async getMuscleId(muscles) {
    if (!muscles) return null;
    const muscleresults = await db.query(
      `SELECT id FROM muscles WHERE name=$1`,
      [muscles]
    );
    if (!muscleresults.rows.length) return null;
    const muscleId = muscleresults.rows[0].id;
    return muscleId;
  }

  async addPlan(plan) {
    const result = await db.query(
      "INSERT INTO plans (name, notes, username, level, imgurl) VALUES ($1,$2, $3, $4, $5) RETURNING id",
      [plan.name, plan.notes, plan.username, plan.level, plan.imgUrl]
    );
    const planId = result.rows[0].id;
    for (let workoutId of plan.workouts) {
      const result = await db.query(
        "INSERT INTO plan_workouts (planId, workoutid) values ($1, $2)",
        [planId, workoutId]
      );
    }
    for (let tagId of plan.tags) {
      const result = await db.query(
        "INSERT INTO plan_tags (plan_id, tag_id) values ($1, $2)",
        [planId, tagId]
      );
    }
    return true;
  }

  async bookmarkPlan(username, planId) {
    const result = await db.query(
      "INSERT INTO saved_plans (username, planid) values ($1, $2)",
      [username, planId]
    );
    return true;
  }

  async removeBookmarkPlan(username, planId) {
    const result = await db.query(
      "DELETE FROM saved_plans WHERE username=$1 AND planid=$2",
      [username, planId]
    );
    return true;
  }

  async getPlans(planName, username, bookUser) {
    let query = `SELECT plans.id, plans.name, plans.notes, plans.username, plans.level as levelid, plans.imgurl, plan_levels.name as level
       FROM plans
       INNER JOIN plan_levels
       ON plan_levels.id = plans.level`;
    let filter = false;
    if (planName) {
      query = query + ` WHERE name LIKE '%${planName}%'`;
      filter = true;
    }

    if (username) {
      if (filter) {
        query += ` AND username='${username}'`;
      } else {
        query += ` WHERE username='${username}'`;
      }
    }

    const results = await db.query(query);
    const plans = results.rows;
    const bookedResult = await db.query(
      "select planid from saved_plans where username=$1",
      [bookUser]
    );
    const bookedIdsObj = bookedResult.rows;
    const bookedIds = bookedIdsObj.map((el) => el.planid);
    const updatedPlans = plans.map((p) => {
      if (bookedIds.includes(p.id)) {
        p["booked"] = true;
      } else {
        p["booked"] = false;
      }
      return p;
    });
    // add tags to the result
    for (let plan of updatedPlans) {
      const result = await db.query(
        `SELECT name 
        from plan_tags
        INNER JOIN tags
        on plan_tags.tag_id = tags.id
        where plan_id=${plan.id}`
      );
      const tags = result.rows.map((t) => t.name);
      plan["tags"] = tags;
    }
    return updatedPlans;
  }

  async getBookmarkedPlans(username) {
    const result = await db.query(
      `SELECT 
      plans.id, plans.name, plans.notes, plans.username, plans.sun, plans.mon, plans.tue, plans.wed, plans.thu, plans.fri, plans.sat, plans.imgurl
      FROM plans
      INNER JOIN saved_plans on plans.id = saved_plans.planid
      WHERE saved_plans.username=$1`,
      [username]
    );
    const bookPlans = result.rows.map((p) => (p["booked"] = true));
    return result.rows;
  }

  async getPlanWorkouts(planId) {
    const plansresult = await db.query(
      `SELECT * FROM Plans WHERE id=${planId}`
    );
    const plans = plansresult.rows[0];
    const result = await db.query(
      `SELECT * FROM Plan_workouts WHERE planid=${planId}`
    );
    const workoutids = result.rows.map((e) => e.workoutid);
    const workouts = [];
    for (let workoutId of workoutids) {
      const result = await db.query(
        `SELECT * FROM workout WHERE id=${workoutId}`
      );
      workouts.push(result.rows[0]);
    }
    plans.workouts = workouts;
    return plans;
  }

  async addWorkout(workout) {
    let result = await db.query(
      "INSERT INTO workout (name, description, image_url, video_url) VALUES ($1, $2, $3, $4) RETURNING id",
      [workout.name, workout.description, workout.imageUrl, workout.videoUrl]
    );
    const workoutId = result.rows[0];
    for (let muscleId of workout.muscles) {
      result = await db.query(
        "INSERT INTO workout_muscles (workout_id, muscle_id) VALUES ($1,$2)",
        [workoutId.id, muscleId]
      );
    }

    for (let equipmentId of workout.equipments) {
      result = await db.query(
        "INSERT INTO workout_equipments (workout_id, equipment_id) VALUES ($1,$2)",
        [workoutId.id, equipmentId]
      );
    }

    return workoutId;
  }

  async getMuscles() {
    const result = await db.query(`SELECT * FROM muscles`);
    return result.rows;
  }

  async getAllWorkoutEquipments() {
    const result = await db.query(`SELECT * FROM equipments`);
    return result.rows;
  }

  async getAllLevels() {
    const result = await db.query(`SELECT * FROM plan_levels`);
    return result.rows;
  }

  async getAllTags() {
    const result = await db.query(`SELECT * FROM tags`);
    return result.rows;
  }
}

module.exports = Workout;
