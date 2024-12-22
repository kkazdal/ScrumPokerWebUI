"use client"
import React, { JSX, useState } from "react";
import { Form, useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Alert, FormControl, FormControlLabel, Radio, RadioGroup, Snackbar } from "@mui/material";
import { TextFieldFormControl } from "./atoms/TextFieldController";
import { HttpStatus, radioBtnEnum } from "@/enums/enums";
import postService from "@/services/PostService";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { addInfoUser } from "@/redux/features/userInfoSlice";
import { voteList } from "@/constants/voteList";


export const HomeSection = (): JSX.Element => {
    const dispatch = useDispatch();

    const {
        control: formControlNewSession,
        handleSubmit: formSubmitNewSession,
    } = useForm();

    const {
        control: formControlJoinSession,
        handleSubmit: formSubmitJoinSession,
    } = useForm();

    const [openSnackbar, setOpenSnackbar] = useState({
        open: false,
        errorMessage: ""
    });



    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [selectedRadio, setSelectedRadio] = useState<any>(voteList[0].id);
    const router: any = useRouter();

    const createNewSession = async (formValues: any) => {
        const params: any = {
            username: formValues.yourName,
            roomName: formValues.roomName,
            estimationMethodId: selectedRadio
        }
        try {
            const selectedRadioBtnId = voteList.filter((item: any) => item.id == selectedRadio);

            const response = await postService("/UserRoom/FirstCreateUserRoom", params);

            if (response.status == HttpStatus.OK) {

                var roomId = response.data.roomUniqId;

                const addUserParams: any = {
                    username: formValues.yourName,
                    roomUniqId: roomId,
                    selectedRadio: selectedRadioBtnId
                }

                dispatch(addInfoUser(addUserParams));

                router.push(`/session/${roomId}`);
            }
        } catch (error) {
            errorMessageFunc(error);
        }
    }

    const postJoinSession = async (formValues: any) => {
        const params: any = {
            username: formValues.yourName,
            roomUniqId: formValues.sessionId
        }

        try {
            const response = await postService("/UserRoom/CreateUserRoom", params);
            if (response.status == HttpStatus.OK) {
                const userInfo: any = {
                    username: formValues.yourName,
                    roomUniqId: formValues.sessionId,
                    userId: response.data.temporaryUserId
                }
                dispatch(addInfoUser(userInfo));

                router.push(`/session/${formValues.sessionId}`);

            }
        } catch (error: any) {
            errorMessageFunc(error);
        }
    }


    const _onClickChangeTab = (id: number) => {
        setSelectedTab(id);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedRadio(parseInt(event.target.value));
    };

    const _formSubmitNewSession = (formValues: any): void => {
        createNewSession(formValues);
    }

    const _formSubmitJoinSession = (formValues: any): void => {
        postJoinSession(formValues);
    }

    const handleClose = (): void => {
        setOpenSnackbar({
            ...openSnackbar,
            open: false
        })
    }

    const errorMessageFunc = (error: any): void => {
        const { errorMessage } = error.response.data;

        if (errorMessage) {
            setOpenSnackbar({
                errorMessage,
                open: true
            })
        } else {
            setOpenSnackbar({
                errorMessage: "An unexpected error occurred. Please try again.",
                open: true
            })
        }
    }

    return (
        <div className="w-full flex flex-col items-center mt-10">
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: "right" }}
                open={openSnackbar.open}
                autoHideDuration={2000}
                onClose={handleClose}>

                <Alert
                    onClose={handleClose}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}>
                    {openSnackbar.errorMessage}
                </Alert>

            </Snackbar>
            <div className="flex space-x-2 w-full justify-center">
                <button
                    onClick={() => _onClickChangeTab(0)}
                    className={`flex items-center px-6 py-2 rounded-t-lg ${selectedTab === 0 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    <AddCircleOutlineIcon className="mr-2" />
                    <p>New Session</p>
                </button>
                <button
                    onClick={() => _onClickChangeTab(1)}
                    className={`flex items-center px-6 py-2 rounded-t-lg justify-center ${selectedTab === 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                >
                    <IosShareIcon className="mr-2" />
                    <p>Join Session</p>
                </button>
            </div>

            {selectedTab === 0 && (
                <div className="w-full bg-white p-6 rounded-lg shadow-md max-w-3xl">
                    <form onSubmit={formSubmitNewSession(_formSubmitNewSession)}>
                        <div className="space-y-4">
                            <div>
                                <TextFieldFormControl
                                    label="Your Name"
                                    formControl={formControlNewSession}
                                    name="yourName"
                                    requiredMessage="This field is required"
                                />
                            </div>
                            <div>
                                <TextFieldFormControl
                                    label="Room Name"
                                    formControl={formControlNewSession}
                                    name="roomName"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Choose Estimation Method</label>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={selectedRadio}
                                        onChange={handleChange}
                                    >
                                        {
                                            voteList.map((item: any) => {
                                                return <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item?.value} />
                                            })
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </div>

                            <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg">Start Session</button>
                        </div>
                    </form>
                </div>
            )}

            {selectedTab === 1 && (
                <div className="w-full bg-white p-6 rounded-lg shadow-md max-w-3xl">
                    <div className="space-y-4">
                        <form onSubmit={formSubmitJoinSession(_formSubmitJoinSession)}>
                            <div>
                                <TextFieldFormControl
                                    label="Session ID"
                                    formControl={formControlJoinSession}
                                    name="sessionId"
                                    requiredMessage="This field is required"
                                />
                            </div>
                            <div className="pt-4">
                                <TextFieldFormControl
                                    label="Your Name"
                                    formControl={formControlJoinSession}
                                    name="yourName"
                                    requiredMessage="This field is required"
                                />
                            </div>
                            <button className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg">Join Session</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}