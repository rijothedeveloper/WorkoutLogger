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
