import React, {Component} from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Control from './components/TaskControl';
import TaskList from './components/TaskList';


class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisPlayForm: false,
            taskEditing: null,
            filter: {
                name: "",
                status: -1
            },
            keyword: "",
            sortBy: "name",
            sortValue: 1
        };

        this.onGenerateData = this.onGenerateData.bind(this);
        this.onToggleForm = this.onToggleForm.bind(this);
        this.onCloseForm = this.onCloseForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        this.findIndex = this.findIndex.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onShowForm = this.onShowForm.bind(this);
        this.onFilter = this.onFilter.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSort = this.onSort.bind(this);
        
    }

    onSort(sortBy, sortValue) {
        this.setState({
            sortBy: sortBy,
            sortValue: sortValue
        });
    }

    onSearch(keyword) {
        this.setState({
            keyword: keyword.toLowerCase()
        })
    }

    onFilter(filterName, filterStatus) { 
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName.toLowerCase(), 
                status: filterStatus
            }
        })
    }

    onUpdateStatus(id) {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        if(index !== -1) {
            tasks[index].status = !tasks[index].status; 
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDelete(id) {
        var {tasks} = this.state;
        var index = this.findIndex(id);

        if(index !== -1) {
            tasks.splice(index, 1);
            this.setState({
                tasks: tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdate(id) {
        var {tasks} = this.state;
        var index = this.findIndex(id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing: taskEditing
        });
        this.onShowForm();

        // localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findIndex(id) {
        var {tasks} = this.state;
        var result;
        tasks.forEach((task, index) => {
            if(task.id === id) {
                result = index;
            }
        });
        return result;
    }

    componentWillMount() {
        if(localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks
            });
        }
    }

    onGenerateData() {
        var randomstring = require("randomstring");

        var tasks = [
            {
                id: randomstring.generate(),
                name: "Khóa học HTML/CSS",
                status: true
            },
            {
                id: randomstring.generate(),
                name: "Khóa học JavaScript",
                status: false
            },
            {
                id: randomstring.generate(),
                name: "Khóa học React JS",
                status: true
            },
        ];

        this.setState({
            tasks: tasks
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onToggleForm() {
        if(this.state.isDisPlayForm && this.state.taskEditing !== null) {
            this.setState({
                isDisPlayForm: true,
                taskEditing: null
            });
        } else {
            this.setState({
                isDisPlayForm: !this.state.isDisPlayForm,
                taskEditing: null
            });
        }
    }

    onCloseForm() {
        this.setState({
            isDisPlayForm: false
        })
    }

    onShowForm() {
        this.setState({
            isDisPlayForm: true
        })
    }
        
    onSubmit(data) {
        var randomstring = require("randomstring");
        var {tasks} = this.state;

        if(data.id === "") {
            data.id = randomstring.generate();
            tasks.push(data);
        } else {
            var index = this.findIndex(data.id);
            tasks[index] = data;
        }
        this.setState({
            tasks: tasks,
            taskEditing: null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }

    render() {

        var {tasks, isDisPlayForm, taskEditing, filter, keyword, sortBy, sortValue} = this.state; // var tasks = this.state.tasks;

        if(filter) {
            if(filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name) !== -1;
                })
            }
            tasks = tasks.filter((task) => {
                if(filter.status === -1) {
                    return task;
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            });
        }
        
        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1; 
            });
        }

        if(sortBy === "name") {
            tasks.sort((a, b) => {
                if(a.name > b.name) return sortValue;
                else if(a.name < b.name) return -sortValue;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue;
                else if(a.status < b.status) return sortValue;
                else return 0;
            });
        }

        var eleTaskForm = isDisPlayForm ? <TaskForm 
                                            onCloseForm={this.onCloseForm}
                                            onSubmit={this.onSubmit}
                                            task={taskEditing}
                                         /> : "";

        return (
            <div>
                <div className="App">
                    <div className="container">
                    <div className="text-center">
                        <h1>Quản Lý Công Việc</h1>
                        <hr />
                    </div>
                    <div className="row">
                        <div className={isDisPlayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
                            {eleTaskForm}
                        </div>
                        
                        <div className={isDisPlayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                            <button 
                            type="button" 
                            className="btn btn-primary"
                            onClick={this.onToggleForm}
                            >
                                <span className="fa fa-plus mr-5" />Thêm Công Việc
                            </button>
                            <button
                                type="button" 
                                className="btn btn-danger ml-5"
                                onClick={this.onGenerateData}
                                >
                                Generate Data
                            </button>

                            <Control 
                            onSearch={this.onSearch}
                            onSort={this.onSort}
                            sortBy={sortBy}
                            sortValue={sortValue}
                             />
                            
                            <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                <TaskList 
                                    tasks={tasks} 
                                    onUpdateStatus={this.onUpdateStatus} 
                                    onDelete={this.onDelete}
                                    onUpdate={this.onUpdate}
                                    onFilter={this.onFilter}
                                />
                            </div>
                         
                        </div>
                        
                        </div>
                    </div>
                    </div>
        
                </div> 
            </div>
        );
    }

}

export default App;
