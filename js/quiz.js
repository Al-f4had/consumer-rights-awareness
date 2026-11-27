document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector("#quiz-card");
  if (!card) return;

  const questions = [
    {q:"Which law is the main modern consumer-protection law in India?",a:["Consumer Protection Act, 2019","Companies Act, 2013","Information Technology Act, 2000","Indian Contract Act, 1872"],correct:0,why:"The Consumer Protection Act, 2019 is the key modern framework. It came into effect on 20 July 2020."},
    {q:"Which right protects consumers from hazardous goods and services?",a:["Right to Choose","Right to Safety","Right to be Heard","Right to Consumer Education"],correct:1,why:"The Right to Safety concerns protection against goods and services that may be hazardous to life and property."},
    {q:"What is the National Consumer Helpline number?",a:["100","1098","1915","112"],correct:2,why:"The National Consumer Helpline can be reached at 1915. Check its official website for current hours and channels."},
    {q:"Which document is especially useful as proof of purchase?",a:["A product advertisement","A purchase invoice or receipt","A social media post","A product colour chart"],correct:1,why:"An invoice or receipt helps establish purchase details. Keep payment proof, warranty documents and relevant communications too."},
    {q:"What does 'deficiency' generally refer to under consumer law?",a:["A shortcoming in a service","A product's colour","A discount offered by a seller","A consumer's shopping preference"],correct:0,why:"Deficiency refers to a fault, imperfection, shortcoming or inadequacy in the quality or manner of performance of a service."},
    {q:"What is the role of the National Consumer Helpline?",a:["It replaces all courts","It guarantees every refund","It facilitates consumer grievances at the pre-litigation stage","It issues product licences"],correct:2,why:"NCH is a grievance-facilitation channel at the pre-litigation stage. Consumer Commissions adjudicate formal disputes."},
    {q:"Which portal is used for Consumer Commission services and online filing?",a:["e-Jagriti","DigiLocker only","GST portal","Income Tax portal"],correct:0,why:"e-Jagriti is the official portal for Consumer Commission services. Verify current filing requirements there."},
    {q:"What should you do before escalating a consumer complaint?",a:["Delete all messages","Keep invoices and evidence and contact the seller","Post private details publicly","Throw away the product documents"],correct:1,why:"Preserve invoices, screenshots, warranty records and communication. Contact the seller and note the complaint reference."}
  ];

  const count = document.querySelector("#question-count");
  const scoreLabel = document.querySelector("#score-label");
  const progress = document.querySelector("#quiz-progress");
  const questionText = document.querySelector("#question-text");
  const options = document.querySelector("#answer-options");
  const feedback = document.querySelector("#answer-feedback");
  const next = document.querySelector("#next-question");
  const result = document.querySelector("#quiz-result");
  let current = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    answered = false;
    const item = questions[current];
    count.textContent = `Question ${current + 1} of ${questions.length}`;
    scoreLabel.textContent = `Score: ${score}`;
    progress.style.width = `${(current / questions.length) * 100}%`;
    questionText.textContent = item.q;
    feedback.hidden = true;
    feedback.textContent = "";
    feedback.className = "answer-feedback";
    next.disabled = true;
    next.textContent = current === questions.length - 1 ? "See my result →" : "Next question →";
    options.innerHTML = "";

    item.a.forEach((answer, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.innerHTML = `<span class="option-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
      button.querySelector("span:last-child").textContent = answer;
      button.addEventListener("click", () => chooseAnswer(index));
      options.appendChild(button);
    });
  }

  function chooseAnswer(selected) {
    if (answered) return;
    answered = true;
    const item = questions[current];
    const buttons = [...options.querySelectorAll("button")];
    buttons.forEach((button, index) => {
      button.disabled = true;
      if (index === item.correct) button.classList.add("correct");
      if (index === selected && selected !== item.correct) button.classList.add("incorrect");
    });
    const correct = selected === item.correct;
    if (correct) score++;
    scoreLabel.textContent = `Score: ${score}`;
    feedback.hidden = false;
    feedback.classList.add(correct ? "good" : "bad");
    feedback.textContent = `${correct ? "Correct!" : "Not quite."} ${item.why}`;
    next.disabled = false;
  }

  function showResult() {
    card.hidden = true;
    result.hidden = false;
    progress.style.width = "100%";
    const percentage = Math.round((score / questions.length) * 100);
    let message = "Keep learning. Review the rights and complaint guide, then try again.";
    if (score >= 7) message = "Excellent work! You have a strong understanding of consumer awareness basics.";
    else if (score >= 5) message = "Good effort! A little more revision will strengthen your knowledge.";
    result.innerHTML = `<span class="eyebrow">QUIZ COMPLETE</span><h2>Your result</h2><div class="result-score">${score}/${questions.length}</div><p>${percentage}% correct. ${message}</p><button class="btn btn-primary" id="restart-quiz" type="button">Try again ↻</button> <a class="btn btn-secondary" href="rights.html">Review consumer rights</a>`;
    result.querySelector("#restart-quiz").addEventListener("click", () => {
      current = 0; score = 0; card.hidden = false; result.hidden = true; renderQuestion();
    });
  }

  next.addEventListener("click", () => {
    if (!answered) return;
    if (current === questions.length - 1) showResult();
    else { current++; renderQuestion(); }
  });

  renderQuestion();
});
