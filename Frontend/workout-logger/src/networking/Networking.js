export async function fetchPlans(token, name = null, username = null) {
  let fetchURL = "http://localhost:3000/workouts/plan";
  if (name) {
    fetchURL += `?name=${name}`;
  }
  if (username) {
    if (name) {
      fetchURL += `username=${username}`;
    } else {
      fetchURL += `?username=${username}`;
    }
  }

  try {
    const response = await fetch(fetchURL, {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const plans = await response.json();
    return plans;
  } catch (error) {
    return { error };
  }
}

export async function fetchbookmarkedPlans(token) {
  let fetchURL = "http://localhost:3000/workouts/plan/bookmarked/";

  try {
    const response = await fetch(fetchURL, {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const plans = await response.json();
    return plans;
  } catch (err) {
    return err;
  }
}

export async function fetchWorkouts(token) {
  try {
    const response = await fetch("http://localhost:3000/workouts/", {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const w = await response.json();
    return w;
  } catch (err) {
    return err;
  }
}

export async function bookmarkPlan(token, planId) {
  try {
    const response = await fetch(
      "http://localhost:3000/workouts/plan/bookmarkPlan",
      {
        method: "POST",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: planId,
        }),
      }
    );
    const w = await response.json();
    return w;
  } catch (err) {
    return err;
  }
}

export async function removeBookmarkPlan(token, planId) {
  try {
    const response = await fetch(
      "http://localhost:3000/workouts/plan/bookmarkPlan",
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId: planId,
        }),
      }
    );
    const w = await response.json();
    return w;
  } catch (err) {
    return err;
  }
}

export async function fetchWorkout(token, workoutId) {
  try {
    const response = await fetch(
      `http://localhost:3000/workouts/${workoutId}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const w = await response.json();
    return w;
  } catch (err) {
    return err;
  }
}

export async function fetchPlan(token, planId) {
  try {
    const response = await fetch(
      `http://localhost:3000/workouts/plan/${planId}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    const w = await response.json();
    return w;
  } catch (err) {
    return err;
  }
}

export async function fetchUserInfo(token, username) {
  try {
    const response = await fetch(`http://localhost:3000/user/${username}`, {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const user = await response.json();
    return user;
  } catch (err) {
    return err;
  }
}

export async function saveUserInfo(token, user) {
  try {
    const response = await fetch(
      `http://localhost:3000/user/${user.username}`,
      {
        method: "PATCH",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: user.password,
          height: user.height,
          weight: user.weight,
        }),
      }
    );
    const result = await response.json();
    return result;
  } catch (err) {
    return { error: err };
  }
}

export async function getMuscles(token) {
  try {
    const response = await fetch("http://192.168.86.25:3001/workouts/muscles", {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

// export async function getWorkoutCategories(token) {
//   try {
//     const response = await fetch(
//       "http://192.168.86.25:3001/workouts/workoutCategories",
//       {
//         method: "GET",
//         mode: "cors",
//         headers: {
//           authorization: "bearer " + token,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     return error;
//   }
// }

export async function getAllWorkoutEquipments(token) {
  try {
    const response = await fetch(
      "http://192.168.86.25:3001/workouts/workoutEquipments",
      {
        method: "GET",
        mode: "cors",
        headers: {
          authorization: "bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    return error;
  }
}

export async function getAllLevels(token) {
  try {
    const response = await fetch("http://192.168.86.25:3001/workouts/levels", {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { error };
  }
}

export async function getAllTags(token) {
  try {
    const response = await fetch("http://192.168.86.25:3001/workouts/tags", {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { error };
  }
}

export async function addWorkout(token, workout) {
  try {
    const response = await fetch("http://localhost:3000/workouts/addWorkout", {
      method: "POST",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(workout),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return { error: err };
  }
}

export async function addPlan(token, plan) {
  try {
    const response = await fetch("http://localhost:3000/workouts/plan", {
      method: "POST",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });
    const result = await response.json();
    return result;
  } catch (err) {
    return err;
  }
}
