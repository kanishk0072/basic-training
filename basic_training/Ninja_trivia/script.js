const strt_screen = document.querySelector("#start-screen");
const strt_btn = document.querySelector("#start-btn");
const game_screen = document.querySelector("#game-screen");
const end_screen = document.querySelector("#end-screen");
const question_text = document.querySelector("#question-text");
const option_buttons = document.querySelectorAll(".option-btn");
const score_display = document.querySelector("#score");
const lives_display = document.querySelector("#lives");
const play_again_btn = document.querySelector("#play-again-btn");

const game = {
    questions: [
        {
            question: "Which data structure is most commonly used by databases to implement indexes?",
            options: ["Linked List", "B-Tree / B+ Tree", "Stack", "Hash Map only"],
            correctAnswerIndex: 1
        },
        {
            question: "What does ACID stand for in database transactions?",
            options: [
                "Atomicity, Consistency, Isolation, Durability",
                "Access, Control, Integrity, Data",
                "Atomic, Concurrent, Isolated, Durable",
                "Availability, Consistency, Isolation, Data"
            ],
            correctAnswerIndex: 0
        },
        {
            question: "Which normal form eliminates transitive dependency?",
            options: ["1NF", "2NF", "3NF", "BCNF"],
            correctAnswerIndex: 2
        },
        {
            question: "What is a 'dirty read' in database transactions?",
            options: [
                "Reading corrupted data from disk",
                "Reading uncommitted changes made by another transaction",
                "Reading data from a backup file",
                "Reading data with a syntax error"
            ],
            correctAnswerIndex: 1
        },
        {
            question: "Which of these is NOT a type of SQL JOIN?",
            options: ["INNER JOIN", "LEFT JOIN", "CROSS JOIN", "PARALLEL JOIN"],
            correctAnswerIndex: 3
        },
        {
            question: "What is the purpose of a 'write-ahead log' (WAL) in databases?",
            options: [
                "To store user login history",
                "To log changes before they are applied, ensuring crash recovery",
                "To cache SELECT query results",
                "To store table schema definitions"
            ],
            correctAnswerIndex: 1
        },
        {
            question: "Which isolation level allows the highest concurrency but is most prone to anomalies?",
            options: ["Serializable", "Repeatable Read", "Read Committed", "Read Uncommitted"],
            correctAnswerIndex: 3
        },
        {
            question: "What does 'query optimizer' primarily decide?",
            options: [
                "The color scheme of the database UI",
                "The most efficient execution plan for a query",
                "Which users can access the database",
                "The backup schedule"
            ],
            correctAnswerIndex: 1
        },
        {
            question: "What is a 'deadlock' in database systems?",
            options: [
                "When a table gets permanently corrupted",
                "When two or more transactions wait forever for each other's locks",
                "When a query takes too long to execute",
                "When the database server crashes"
            ],
            correctAnswerIndex: 1
        },
        {
            question: "Which of these best describes 'denormalization'?",
            options: [
                "Removing all indexes from a table",
                "Deleting duplicate rows automatically",
                "Intentionally introducing redundancy to improve read performance",
                "Converting a table into a view"
            ],
            correctAnswerIndex: 2
        }
    ],

    score: 0,
    lives: 3,
    currentQuestionIndex: 0,

    init() {
        this.score = 0;
        this.lives = 3;
        this.currentQuestionIndex = 0;

        strt_screen.classList.remove('active');
        end_screen.classList.remove('active');
        game_screen.classList.add('active');

        this.updateStats();
        this.showQuestion();
    },

    updateStats() {
        score_display.textContent = `Score: ${this.score}`;
        lives_display.textContent = `Lives: ${this.lives}`;
    },

    showQuestion() {
        const currentQuestion = this.questions[this.currentQuestionIndex];

        question_text.textContent = currentQuestion.question;

        option_buttons.forEach((btn, index) => {
            btn.textContent = currentQuestion.options[index];
            btn.classList.remove('correct', 'wrong');
            btn.disabled = false;
        });
    },

    checkAnswer(selectedIndex) {
        const currentQuestion = this.questions[this.currentQuestionIndex];
        const correctOption = currentQuestion.correctAnswerIndex;

        option_buttons.forEach(btn => btn.disabled = true);

        if (selectedIndex === correctOption) {
            this.score += 10;
            option_buttons[selectedIndex].classList.add('correct');
        } else {
            this.lives -= 1;
            option_buttons[selectedIndex].classList.add('wrong');
            option_buttons[correctOption].classList.add('correct');
        }

        this.updateStats();

        setTimeout(() => {
            this.currentQuestionIndex += 1;

            if (this.lives <= 0) {
                this.endGame(false);
            } else if (this.currentQuestionIndex >= this.questions.length) {
                this.endGame(true);
            } else {
                this.showQuestion();
            }
        }, 600);
    },
};

strt_btn.addEventListener('click', function () {
    game.init();
});

option_buttons.forEach((btn, index) => {
    btn.addEventListener('click', function () {
        game.checkAnswer(index);
    });
});