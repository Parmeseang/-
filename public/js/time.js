const countdownDates = [
    { date: new Date("2024-08-03T08:00:00").getTime(), idPrefix: "1" },
    { date: new Date("2024-12-05T08:00:00").getTime(), idPrefix: "2" },
    { date: new Date("2025-04-17T08:00:00").getTime(), idPrefix: "3" }
  ];

  function updateCountdown(countdown) {
    let now = new Date().getTime();
    let distance = countdown.date - now;

    const millisecondsPerDay = 86400000;
    const hoursPerDay = 24;
    const minutesPerHour = 60;
    const secondsPerMinute = 60;

    let daysRemaining = Math.floor(distance / millisecondsPerDay);
    let hoursRemaining = Math.floor((distance % millisecondsPerDay) / 
         (millisecondsPerDay / hoursPerDay)
    );
    let minutesRemaining = Math.floor(
      (distance % (millisecondsPerDay / hoursPerDay)) /
        (millisecondsPerDay / hoursPerDay / minutesPerHour)
    );
    let secondsRemaining = Math.floor(
      (distance % (millisecondsPerDay / hoursPerDay / minutesPerHour)) /
        (millisecondsPerDay / hoursPerDay / minutesPerHour / secondsPerMinute)
    );

    document.getElementById(`days${countdown.idPrefix}`).innerHTML = daysRemaining;
    document.getElementById(`hours${countdown.idPrefix}`).innerHTML = hoursRemaining;
    document.getElementById(`min${countdown.idPrefix}`).innerHTML = minutesRemaining;
    document.getElementById(`sec${countdown.idPrefix}`).innerHTML = secondsRemaining;

    if (distance < 0) {
      clearInterval(countdown.interval);
      document.getElementById(`countdown${countdown.idPrefix}`).innerHTML = "";
      document.getElementById(`hny${countdown.idPrefix}`).innerHTML = "Time's Up!";
    }
  }

  countdownDates.forEach(countdown => {
    countdown.interval = setInterval(() => updateCountdown(countdown), 1000);
  });