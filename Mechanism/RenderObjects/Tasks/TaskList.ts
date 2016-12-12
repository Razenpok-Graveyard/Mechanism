class TaskList {
    static current?: TaskList;
    private tasks: Task[];

    get length() {
        return this.tasks ? this.tasks.length : 0;
    }

    add(task: Task | Iterator<WaitPredicate>) {
        if (!this.tasks) {
            this.tasks = [];
        }
        if (task instanceof Task) {
            this.tasks.push(task);
            return;
        }
        this.tasks.push(new Task(task));
    }

    update(delta: number) {
        if (!this.tasks || this.tasks.length === 0) {
            return;
        }
        const savedCurrent = TaskList.current;
        TaskList.current = this;
        for (let task of this.tasks) {
            task.update(delta);
        }
        this.tasks = this.tasks.filter(task => !task.completed);
        TaskList.current = savedCurrent;
    }
}