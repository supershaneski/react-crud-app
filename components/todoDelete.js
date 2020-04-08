import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function todoDelete(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setOpen(false);
        props.onClick();
    }

    return (
        <>
        <div className="todo-delete" onClick={handleClickOpen}>
            <span>&#215;</span>
        </div>
        <div>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Delete Todo"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this item?
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleDelete} color="primary">
                Delete
            </Button>
            </DialogActions>
        </Dialog>
        </div>        
        <style jsx>
            {`
            .todo-delete {
                border: 0px solid #000;
                position: absolute;
                right: 0px;
                top: 0px;
                padding: 2px 5px 0px 0px;
                font-size: 1.0em;
                cursor: pointer;
                z-index: 2;
                user-select: none;
                color: #fff;
            }
            .todo-delete:hover {
                color: #222;
            }
            .todo-delete:active {
                color: #fff;
            }
            `}
        </style>
        </>
    )
}