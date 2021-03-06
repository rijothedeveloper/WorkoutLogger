const db = require("../db");
class Workout {
  async getAllWorkouts(category, muscles, name) {
    let filter = false;
    let query = "SELECT * FROM workout";
    if (category) {
      if (!filter) {
        query = query + " where";
      }
      filter = true;
      query = query + ` category = ${await this.getCategoryId(category)}`;
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
    const results = await db.query(query);
    return results.rows;
  }

  async getWorkout(id) {
    const result = await db.query(`SELECT * FROM workout WHERE id=$1`, [id]);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return false;
    }
  }

  async getCategoryId(category) {
    if (!category) return null;
    const categoryresults = await db.query(
      `SELECT id FROM workout_category WHERE name=$1`,
      [category]
    );
    if (!categoryresults.rows.length) return null;
    const categoryId = categoryresults.rows[0].id;
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
      "INSERT INTO plans (name, notes, username, sun, mon, tue, wed, thu, fri, sat, imgurl) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id",
      [
        plan.name,
        plan.notes,
        plan.username,
        plan.sun,
        plan.mon,
        plan.tue,
        plan.wed,
        plan.thu,
        plan.fri,
        plan.sun,
        plan.imgUrl,
      ]
    );
    const planId = result.rows[0].id;
    for (let workoutId of plan.workouts) {
      const result = await db.query(
        "INSERT INTO plan_workouts (planId, workoutid) values ($1, $2)",
        [planId, workoutId]
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
    let query = "SELECT * FROM plans";
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
    const newPlans = plans.map((p) => {
      if (bookedIds.includes(p.id)) {
        p["booked"] = true;
      } else {
        p["booked"] = false;
      }
    });
    return plans;
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
    const result = await db.query(
      "INSERT INTO workout (category, name, muscles, description, image_url, video_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
      [
        workout.category,
        workout.name,
        workout.muscle,
        workout.description,
        workout.imageUrl,
        workout.videoUrl,
      ]
    );
    const workoutId = result.rows[0];
    return workoutId;
  }

  async getMuscles() {
    const result = await db.query(`SELECT * FROM muscles`);
    return result.rows;
  }

  async getWorkoutCategory() {
    const result = await db.query(`SELECT * FROM workout_category`);
    return result.rows;
  }
}

module.exports = Workout;
