const state = {
  members: [
    { name: "Aarav Mehta", goal: "Fat loss", plan: "Transformation Pack" },
    { name: "Riya Sharma", goal: "Strength gain", plan: "Quarterly Build" },
    { name: "Karan Nair", goal: "Athletic conditioning", plan: "Monthly Elite" }
  ],
  workouts: [
    { member: "Riya Sharma", focus: "Lower body power", routine: "Barbell squats, walking lunges, sled pushes, core finishers" },
    { member: "Aarav Mehta", focus: "Metabolic conditioning", routine: "Circuit rounds, incline walks, kettlebell swings, rower sprints" }
  ],
  diets: [
    { member: "Aarav Mehta", calories: "2100 kcal", diet: "High-protein breakfast, balanced lunch, low-sugar dinner, 3.5L water" },
    { member: "Riya Sharma", calories: "2450 kcal", diet: "Pre-workout carbs, lean protein lunch, recovery shake, evening salad bowl" }
  ],
  schedule: [
    { className: "HIIT Blast", time: "6:00 AM", capacity: 20 },
    { className: "Strength Camp", time: "6:00 PM", capacity: 16 }
  ],
  attendance: [
    { name: "Aarav Mehta", status: "Checked in 07:10 AM" },
    { name: "Nisha Patel", status: "Checked in 08:02 AM" },
    { name: "Karan Nair", status: "Checked in 06:12 PM" }
  ],
  progress: [
    { week: "Week 1", result: "Weight down 1.2 kg and cardio stamina improved" },
    { week: "Week 2", result: "Bench press up by 5 kg and sleep consistency improved" }
  ],
  announcements: [
    { title: "Recovery Workshop", detail: "Saturday 5 PM session on mobility, stretching, and recovery nutrition." },
    { title: "April Challenge", detail: "Complete 16 workouts this month to unlock a free body composition scan." }
  ]
};

const dashboardIds = ["trainer-dashboard", "member-dashboard"];
const toast = document.getElementById("toast");

function renderMembers() {
  const registry = document.getElementById("member-registry");
  registry.innerHTML = state.members.map((member) => `
    <div class="list-row">
      <div>
        <strong>${member.name}</strong>
        <span>${member.goal}</span>
      </div>
      <strong>${member.plan}</strong>
    </div>
  `).join("");
  document.getElementById("managed-count").textContent = state.members.length;
  populateMemberSelects();
}

function renderWorkouts() {
  const trainerFeed = document.getElementById("workout-feed");
  const memberFeed = document.getElementById("member-workouts");
  trainerFeed.innerHTML = state.workouts.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.member}</strong>
        <span>${item.focus}</span>
        <p>${item.routine}</p>
      </div>
      <button class="ghost-btn feed-action" data-edit-workout="${item.member}">Edit</button>
    </div>
  `).join("");
  memberFeed.innerHTML = state.workouts.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.focus}</strong>
        <span>${item.member}</span>
        <p>${item.routine}</p>
      </div>
    </div>
  `).join("");
  document.getElementById("plan-count").textContent = state.workouts.length;
  document.getElementById("member-workout-count").textContent = state.workouts.length;
}

function renderDiets() {
  const trainerFeed = document.getElementById("diet-feed");
  const memberFeed = document.getElementById("member-diets");
  trainerFeed.innerHTML = state.diets.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.member}</strong>
        <span>${item.calories}</span>
        <p>${item.diet}</p>
      </div>
      <button class="ghost-btn feed-action" data-edit-diet="${item.member}">Edit</button>
    </div>
  `).join("");
  memberFeed.innerHTML = state.diets.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.calories}</strong>
        <span>${item.member}</span>
        <p>${item.diet}</p>
      </div>
    </div>
  `).join("");
  document.getElementById("diet-count").textContent = state.diets.length;
}

function renderSchedule() {
  const scheduleFeed = document.getElementById("schedule-feed");
  scheduleFeed.innerHTML = state.schedule.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.className}</strong>
        <span>${item.time}</span>
      </div>
      <strong>${item.capacity} spots</strong>
    </div>
  `).join("");
}

function renderAttendance() {
  const attendanceFeed = document.getElementById("attendance-feed");
  attendanceFeed.innerHTML = state.attendance.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.name}</strong>
        <span>${item.status}</span>
      </div>
    </div>
  `).join("");
}

function renderProgress() {
  const progressFeed = document.getElementById("progress-feed");
  progressFeed.innerHTML = state.progress.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.week}</strong>
        <p>${item.result}</p>
      </div>
    </div>
  `).join("");
}

function renderAnnouncements() {
  const announcementsFeed = document.getElementById("announcements-feed");
  announcementsFeed.innerHTML = state.announcements.map((item) => `
    <div class="feed-item">
      <div>
        <strong>${item.title}</strong>
        <p>${item.detail}</p>
      </div>
    </div>
  `).join("");
  if (state.announcements[0]) {
    document.getElementById("announcement-status").textContent = `Latest post: ${state.announcements[0].title}`;
  }
}

function renderAll() {
  renderMembers();
  renderWorkouts();
  renderDiets();
  renderSchedule();
  renderAttendance();
  renderProgress();
  renderAnnouncements();
}

function populateMemberSelects() {
  const memberOptions = state.members.map((member) => `<option value="${member.name}">${member.name}</option>`).join("");
  const workoutSelect = document.getElementById("workout-member-select");
  const dietSelect = document.getElementById("diet-member-select");
  if (workoutSelect) {
    workoutSelect.innerHTML = memberOptions;
  }
  if (dietSelect) {
    dietSelect.innerHTML = memberOptions;
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

function setActiveDashboard(role) {
  dashboardIds.forEach((id) => {
    document.getElementById(id).classList.add("hidden");
  });
  document.getElementById(`${role}-dashboard`).classList.remove("hidden");
  document.getElementById(`${role}-dashboard`).scrollIntoView({ behavior: "smooth", block: "start" });
  document.querySelectorAll(".login-card").forEach((card) => card.classList.remove("active-card"));
  document.getElementById(`${role}-login-card`).classList.add("active-card");
  localStorage.setItem("pulsepointRole", role);
}

function logout(role) {
  document.getElementById(`${role}-dashboard`).classList.add("hidden");
  document.getElementById(`${role}-login-card`).classList.remove("active-card");
  if (localStorage.getItem("pulsepointRole") === role) {
    localStorage.removeItem("pulsepointRole");
  }
  document.getElementById("logins").scrollIntoView({ behavior: "smooth", block: "start" });
  showToast(`${role === "trainer" ? "Trainer" : "Member"} logged out`);
}

function attachTabBehavior() {
  document.querySelectorAll(".tab-bar").forEach((group) => {
    group.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) {
        return;
      }
      const targetId = button.dataset.tabTarget;
      group.querySelectorAll("button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const panelContainer = group.nextElementSibling;
      panelContainer.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
      document.getElementById(targetId).classList.add("active");
    });
  });
}

function attachLoginBehavior() {
  document.querySelectorAll(".login-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const role = form.dataset.login;
      setActiveDashboard(role);
      showToast(`${role === "trainer" ? "Trainer" : "Member"} dashboard ready`);
    });
  });

  document.querySelectorAll("[data-role-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      const role = button.dataset.roleFocus;
      document.getElementById(`${role}-login-card`).scrollIntoView({ behavior: "smooth", block: "center" });
      document.getElementById(`${role}-login-card`).classList.add("active-card");
    });
  });

  document.querySelectorAll("[data-logout]").forEach((button) => {
    button.addEventListener("click", () => logout(button.dataset.logout));
  });
}

function attachForms() {
  document.getElementById("member-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.members.unshift({
      name: formData.get("name"),
      goal: formData.get("goal"),
      plan: formData.get("plan")
    });
    event.currentTarget.reset();
    renderMembers();
    showToast("Member added to registry");
  });

  document.getElementById("workout-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const workout = {
      member: formData.get("member"),
      focus: formData.get("focus"),
      routine: formData.get("routine")
    };
    const existingWorkoutIndex = state.workouts.findIndex((item) => item.member === workout.member);
    if (existingWorkoutIndex >= 0) {
      state.workouts[existingWorkoutIndex] = workout;
    } else {
      state.workouts.unshift(workout);
    }
    event.currentTarget.reset();
    populateMemberSelects();
    renderWorkouts();
    showToast("Workout plan saved");
  });

  document.getElementById("diet-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const diet = {
      member: formData.get("member"),
      calories: formData.get("calories"),
      diet: formData.get("diet")
    };
    const existingDietIndex = state.diets.findIndex((item) => item.member === diet.member);
    if (existingDietIndex >= 0) {
      state.diets[existingDietIndex] = diet;
    } else {
      state.diets.unshift(diet);
    }
    event.currentTarget.reset();
    populateMemberSelects();
    renderDiets();
    showToast("Diet plan saved");
  });

  document.getElementById("schedule-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.schedule.unshift({
      className: formData.get("className"),
      time: formData.get("time"),
      capacity: formData.get("capacity")
    });
    event.currentTarget.reset();
    renderSchedule();
    showToast("Session added to schedule");
  });

  document.getElementById("progress-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.progress.unshift({
      week: formData.get("week"),
      result: formData.get("result")
    });
    event.currentTarget.reset();
    renderProgress();
    showToast("Progress check-in added");
  });

  document.getElementById("hydration-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    document.getElementById("hydration-status").textContent = `Today: ${formData.get("liters")}L logged`;
    event.currentTarget.reset();
    showToast("Hydration entry saved");
  });

  document.getElementById("bmi-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const heightCm = Number(formData.get("height"));
    const weightKg = Number(formData.get("weight"));
    const bmi = weightKg / ((heightCm / 100) ** 2);
    let status = "Normal weight";

    if (bmi < 18.5) {
      status = "Underweight";
    } else if (bmi >= 25 && bmi < 30) {
      status = "Overweight";
    } else if (bmi >= 30) {
      status = "Obese";
    }

    document.getElementById("bmi-result").innerHTML = `
      <p>BMI: ${bmi.toFixed(1)}</p>
      <p>Status: ${status}</p>
      <p>Tip: Keep tracking this with your workout and meal plan.</p>
    `;
    showToast("BMI calculated");
  });

  document.getElementById("announcement-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    state.announcements.unshift({
      title: formData.get("title"),
      detail: formData.get("detail")
    });
    event.currentTarget.reset();
    renderAnnouncements();
    showToast("Announcement posted");
  });
}

function attachEditActions() {
  document.addEventListener("click", (event) => {
    const workoutButton = event.target.closest("[data-edit-workout]");
    if (workoutButton) {
      const memberName = workoutButton.dataset.editWorkout;
      const workout = state.workouts.find((item) => item.member === memberName);
      if (workout) {
        const form = document.getElementById("workout-form");
        form.elements.member.value = workout.member;
        form.elements.focus.value = workout.focus;
        form.elements.routine.value = workout.routine;
        document.getElementById("trainer-workouts").scrollIntoView({ behavior: "smooth", block: "start" });
        showToast(`Editing workout for ${memberName}`);
      }
    }

    const dietButton = event.target.closest("[data-edit-diet]");
    if (dietButton) {
      const memberName = dietButton.dataset.editDiet;
      const diet = state.diets.find((item) => item.member === memberName);
      if (diet) {
        const form = document.getElementById("diet-form");
        form.elements.member.value = diet.member;
        form.elements.calories.value = diet.calories;
        form.elements.diet.value = diet.diet;
        document.getElementById("trainer-diets").scrollIntoView({ behavior: "smooth", block: "start" });
        showToast(`Editing diet for ${memberName}`);
      }
    }
  });
}

function restoreSession() {
  const savedRole = localStorage.getItem("pulsepointRole");
  if (savedRole && dashboardIds.includes(`${savedRole}-dashboard`)) {
    setActiveDashboard(savedRole);
  }
}

renderAll();
attachTabBehavior();
attachLoginBehavior();
attachForms();
attachEditActions();
restoreSession();
