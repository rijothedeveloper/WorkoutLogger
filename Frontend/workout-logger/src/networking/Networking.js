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
    console.log(plans);
    return plans;
  } catch (err) {
    return null;
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
    console.log(w);
    return w;
  } catch (err) {
    return null;
  }
}

export async function fetchUserInfo(token) {
  try {
    const response = await fetch("http://localhost:3000/user/", {
      method: "GET",
      mode: "cors",
      headers: {
        authorization: "bearer " + token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const user = await response.json();
    console.log(user);
    return user;
  } catch (err) {
    return null;
  }
}
