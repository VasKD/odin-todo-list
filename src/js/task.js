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

    // give json access to private properties
    toJSON() {
        return {
            id: this.#id,
            title: this.#title,
            dueDate: this.#dueDate,
            priority: this.#priority,
            project: this.#project,
            subtasks: this.#subtasks,
            completed: this.#completed
        };
    }

    // reconstruct the task objects
    static fromJSON(obj) {
        const task = new Task(obj.id, obj.title, obj.dueDate, obj.priority, obj.project, obj.subtasks, obj.completed);

        task.#id = obj.id;
        task.#title = obj.title;
        task.#dueDate = obj.dueDate;
        task.#priority = obj.priority;
        task.#project = obj.project;
        task.#subtasks = obj.subtasks;
        task.#completed = obj.completed;

        return task;
    }

    toggleComplete() {
        this.#completed = !this.#completed;
    }


    // getters
    get id() {
        return this.#id;
    }

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

    set subtasks(subtasks) {
        this.#subtasks = subtasks;
    }

    addSubtask(subtask) {
        this.#subtasks.push(...subtask);
    }
}