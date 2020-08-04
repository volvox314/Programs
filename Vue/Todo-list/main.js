var STORAGE_KEY = 'todos-vuejs-demo';
var todoStorage = {
    fetch: function () {
        var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        todos.forEach(function (todo, index) {
            todo.id = index;
        });
        todoStorage.uid = todos.length;
        return todos;
    },

    save: function (todos) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    }
};

new Vue({
    el: '#app',

    data: {
        todos: [],
        options: [
            { value: -1, label: 'All' },
            { value: 0, label: 'Working' },
            { value: 1, label: 'Completed' }
        ],
        current: -1
    },

    computed: {
        computedTodos: function () {
            return this.todos.filter(function (el) {
                return this.current < 0 ? true : this.current === el.state
            }, this);
        },

        labels() {
            return this.options.reduce(function (a, b) {
                return Object.assign(a, { [b.value]: b.label });
            }, {});
        }
    },

    methods: {
        doAdd: function (event, value) {
            var comment = this.$refs.comment;
            if (!comment.value.length) return;

            this.todos.push({
                id: todoStorage.uid,
                comment: comment.value,
                state: 0
            });

            comment.value = '';
        },

        doChangeState: function (item) {
            item.state = item.state ? 0 : 1;
        },

        doRemove: function (item) {
            var index = this.todos.indexOf(item);
            this.todos.splice(index, 1);
        }
    },

    watch: {
        todos: {
            handler: function (todos) {
                todoStorage.save(todos);
            },
            deep: true
        }
    },

    created() {
        this.todos = todoStorage.fetch();
    }
})