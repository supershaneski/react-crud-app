import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const styles = theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    textTitle: {
        width: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    selectItem: {
        width: 150,
    },
    selectItemLong: {
        width: 175,
    }
});

class TodoAdd extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            text: '',
            open: false,
            date: new Date(),
            error: false,
        }
    }
    
    handleClickOpen() {
        this.resetState(true);
    };

    handleClose() {
        this.resetState(false);
    };

    resetState(flag) {
        this.setState({
            open: flag,
            text: "",
            date: new Date(),
        })
    }

    handleAdd() {
        
        if(this.state.text.length === 0) {
            
            this.setState({
                error: true
            })

        } else {
            
            this.props.onClick({
                name: this.state.text,
                date: this.state.date,
            })

            this.setState({
                open: false
            })
        }
        
    };
    
    handleText(event) {
        var stext = event.target.value;
        stext = (stext.length > 64)?stext.substr(0, 64):stext;
        this.setState({
            text: stext,
            error: (event.target.value.length > 0)?false:true,
        })
    }

    handleDateChange(date) {
        this.setState({
            date: date,
        })
    }

    render() {
        const sErrorMsg = (this.state.error)?'You need to put something.':'max 64 chars';
        return (
            <>
            <div className="control-panel">
            
            <Fab onClick={this.handleClickOpen.bind(this)} color="secondary" aria-label="add">
                <AddIcon />
            </Fab>

            <Dialog 
                fullWidth={true}
                maxWidth={'md'}
                open={this.state.open} 
                onClose={this.handleClose.bind(this)} 
                aria-labelledby="form-dialog-title"
            >

                <DialogTitle id="form-dialog-title">New Todo</DialogTitle>
                <DialogContent>
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="When?"
                        KeyboardButtonProps={{
                            'aria-label': 'select date',
                        }}
                        value={this.state.date}
                        onChange={this.handleDateChange.bind(this)}
                    />
                    </Grid>                    
                </MuiPickersUtilsProvider>

                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="What do you want to do?"
                    type="text"
                    value={this.state.text}
                    onChange={this.handleText.bind(this)}
                    error={this.state.error}
                    helperText={sErrorMsg}
                    fullWidth
                />
                
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose.bind(this)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAdd.bind(this)} color="primary">
                        Add
                    </Button>
                </DialogActions>

            </Dialog>

        </div>
        <style jsx>
        {`
        .control-panel {
            position: fixed;
            bottom: 15px;
            right:15px;
            z-index: 2;
        }
        .select-container {
            display: inline-block;
            margin-top: 15px;
            margin-right: 20px;
        }
        `}
        </style>
            </>
        )
    }
}

export default withStyles(styles)(TodoAdd);