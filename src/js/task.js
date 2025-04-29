export class Task {
    // private variables
    #id;
    #title;
    #dueDate;
    #subtasks;
    #project;
    #priority; 
    #completed;

    static tasks = [];

    constructor(title, subtasks = [], dueDate, priority, project) {
        this.#id = crypto.randomUUID();
        this.#title = title;
        this.#dueDate = dueDate;
        this.#priority = priority;
        this.#project = project;
        this.#subtasks = subtasks;
        this.#completed = false;

        // add tasks to global task array
        Task.tasks.push(this);
    }

    toggleComplete() {
        this.#completed = !this.#completed;
    }


    // getters
    get title() {
        return this.#title;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get project() {
        return this.#project
    }

    get subtasks() {
        return this.#subtasks;
    }

    get completed() {
        return this.#completed;
    }

    get tasks() {
        return Task.tasks;
    }


    // setters 
    set title(title){
        this.#title = title;
    }

    set dueDate(dueDate) {
        this.#dueDate = dueDate;
    }

    set priority(priority) {
        this.#priority = priority;
    }

    set project(project) {
        this.#project = project;
    }
}