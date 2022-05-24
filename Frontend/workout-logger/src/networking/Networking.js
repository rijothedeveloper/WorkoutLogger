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
        method: "POST",
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
    return err;
  }
}
