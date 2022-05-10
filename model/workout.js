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
      "INSERT INTO plans (name, notes, username, sun, mon, tue, wed, thu, fri, sat) VALUES ($1,$2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id",
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
      ]
    );
    const planId = result.rows[0].id;
    for (let workoutId of plan.workouts) {
      const result = await db.query(
        "INSERT INTO plan_workouts (planid, workoutid) values ($1, $2)",
        [planId, workoutId]
      );
    }
    return true;
  }
}

module.exports = Workout;
