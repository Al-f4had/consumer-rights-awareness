# ConsumerShield — Consumer Rights Awareness Portal

**Tagline:** Know Your Rights. Make Informed Choices. Stay Protected.

A responsive, multi-page educational website about consumer rights and grievance redressal in India. Built with HTML5, CSS3, vanilla JavaScript and XML.

## Pages
- `index.html` — Homepage and rights overview
- `rights.html` — Six consumer rights, XML-powered content and search
- `complaints.html` — Complaint steps, evidence checklist and validated demo form
- `laws.html` — Consumer Protection Act, institutions, definitions and official links
- `quiz.html` — Interactive eight-question quiz

## Features
- Five interconnected pages and responsive navigation.
- Responsive layouts for mobile, tablet and desktop.
- Light/dark theme toggle with preference stored in browser local storage.
- Mobile navigation menu.
- Consumer-rights search/filter.
- XML file parsed with `fetch()` and `DOMParser`.
- Complaint-summary form with HTML and JavaScript validation. It does not submit or store personal data.
- Eight-question interactive quiz with instant feedback, score and restart.
- Semantic landmarks, accessible labels, keyboard-friendly controls and reduced-motion support.

## Project structure
```text
consumer-rights-awareness/
├── index.html
├── rights.html
├── complaints.html
├── laws.html
├── quiz.html
├── css/style.css
├── js/main.js
├── js/quiz.js
├── js/validation.js
├── xml/consumer-rights.xml
└── assets/
    ├── images/
    ├── icons/
    └── svg/
        ├── shield-logo.svg
        └── consumer-hero.svg
```

## Run locally
The rights page fetches an XML file, so use a local web server rather than opening HTML through `file://`.
With Python installed, run:
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`. No build step or package installation is required.

## Official information sources
- [National Consumer Helpline — Consumer Rights](https://consumerhelpline.gov.in/public/consumerrights)
- [National Consumer Helpline — Contact](https://consumerhelpline.gov.in/public/contact)
- [Consumer Protection Act, 2019 — India Code PDF](https://www.indiacode.nic.in/bitstream/123456789/15256/5/A2019-35.pdf)
- [Department of Consumer Affairs](https://consumeraffairs.gov.in/)
- [Central Consumer Protection Authority](https://ccpa.doca.gov.in/)
- [e-Jagriti](https://e-jagriti.gov.in/)

## Educational disclaimer
This project is an educational awareness website, not a government service, law firm or legal-advice platform. The complaint form is a front-end demonstration only. It does not send data to the National Consumer Helpline or e-Jagriti. Verify current procedures, jurisdiction, limitation periods and legal requirements through official sources.

Created as a student project: **ConsumerShield — Consumer Rights & Awareness Portal**.
