import React, {Component} from 'react';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false
        }

        this.onCloseForm = this.onCloseForm.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onClear = this.onClear.bind(this);
    }

    componentWillMount() {
        if(this.props.task) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.task) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else if (!nextProps.task) {
            this.setState({
                id: "",
                name: "",
                status: false
            })
        }
    }

    onSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state);

        this.onClear();
        this.onCloseForm();
    }

    onClear() {
        this.setState({
            name: "",
            status: false
        });
    }

    onChange(event) {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'status') value = target.value === 'true' ? true : false
        this.setState({
            [name] : value
        })
    }
    
    onCloseForm() {
        this.props.onCloseForm();
    }


    render() {
        var {id} = this.state;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">{id !=="" ? "Cập nhật công việc" : "Thêm công việc"}</h3>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.onCloseForm}>
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div className="panel-body">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Tên :</label>
                    <input 
                    type="text" 
                    className="form-control" 
                    name = "name"
                    value = {this.state.name}
                    onChange = {this.onChange}
                    />
                    </div>
                    <label>Trạng Thái :</label>
                    <select 
                    className="form-control" 
                    required="required" 
                    name="status"
                    value = {this.state.status}
                    onChange = {this.onChange}
                    >
                    
                    <option value={true}>Đã đăng ký</option>
                    <option value={false}>Chưa đăng ký</option>
                    </select>
                    <br />
                    <div className="text-center">
                    <button 
                    type="submit" 
                    className="btn btn-warning"><span className="fa fa-plus mr5">Thêm</span></button>&nbsp;
                    <button 
                    type="reset" 
                    className="btn btn-danger"
                    onClick={this.onClear}
                    ><span className="fa fa-close mr5">Hủy Bỏ</span></button>
                    </div>
                </form>
                </div>
            </div>
        );
    }

}

export default TaskForm;
