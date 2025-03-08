import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  TextField,
} from "@mui/material";
import React from "react";
import { ColumnsStatus } from "../contexts/ColumnsStatuses";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { reducers } from "../../features/dashboard/dashboardSlice";
import Grid from "@mui/material/Grid2";
import * as Yup from "yup";
import { Card } from "../../features/card/cardSlice";

interface CardFormProps {
  open: boolean;
  handleCloseCard: () => void;
  status: ColumnsStatus;
  usersOptions: string[];
  selectedCard: Card | null;
}

interface CardFormik {
  title: string;
  description: string;
  user: string;
}

const CardSchema = Yup.object().shape({
  title: Yup.string().required("Field is Required"),
});

const CardForm: React.FC<CardFormProps> = ({
  open,
  handleCloseCard,
  status,
  usersOptions,
  selectedCard,
}) => {
  const dispatch = useDispatch();

  const initialValues: CardFormik = {
    title: selectedCard ? selectedCard.title : "",
    description: selectedCard ? selectedCard.description : "",
    user: selectedCard ? selectedCard.assignedTo : "",
  };

  return (
    <Dialog open={open} onClose={handleCloseCard} maxWidth="sm" fullWidth>
      <DialogTitle>Create Task</DialogTitle>
      <Divider />
      <DialogContent>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          className="form-container"
        >
          <Grid item xs={12} sm={12} md={12}>
            <Formik
              initialValues={initialValues}
              validationSchema={CardSchema}
              onSubmit={(values, actions) => {
                dispatch(
                  selectedCard
                    ? reducers.editCard({
                        id: selectedCard.id,
                        title: values.title,
                        description: values.description,
                        assignedTo: values.user,
                        status: selectedCard.status,
                      })
                    : reducers.addCard({
                        id: new Date().getTime(),
                        title: values.title,
                        description: values.description,
                        assignedTo: values.user,
                        status: status,
                      })
                );
                actions.setSubmitting(false);
                handleCloseCard();
              }}
            >
              {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form style={{ width: "100%" }}>
                  <Grid container spacing={2}>
                    <Grid item sx={{ width: "100%", margin: 0 }}>
                      <label htmlFor="title">Title</label>
                      <TextField
                        fullWidth
                        name="title"
                        variant="outlined"
                        value={values.title}
                        onChange={handleChange}
                        error={touched.title && Boolean(errors.title)}
                        helperText={touched.title && errors.title}
                      />
                    </Grid>
                    <Grid item sx={{ width: "100%", margin: 0 }}>
                      <label htmlFor="description">Description</label>
                      <TextField
                        fullWidth
                        name="description"
                        variant="outlined"
                        multiline
                        rows={3}
                        value={values.description}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item sx={{ width: "100%", margin: 0 }}>
                      <label htmlFor="user">Assigned To</label>
                      <TextField
                        select
                        fullWidth
                        name="user"
                        variant="outlined"
                        value={values.user}
                        onChange={handleChange}
                        error={touched.user && Boolean(errors.user)}
                        helperText={touched.user && errors.user}
                      >
                        <MenuItem value="">Select User</MenuItem>
                        {usersOptions.map((u, ui) => (
                          <MenuItem key={`user-option-${ui}`} value={u}>
                            {u}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>

                  <DialogActions sx={{ mt: 3 }}>
                    <Button onClick={handleCloseCard}>Cancel</Button>
                    <Button type="submit" disabled={isSubmitting} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CardForm;
