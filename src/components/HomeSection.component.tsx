"use client"
import React, { JSX, useState } from "react";
import { Form, useForm } from "react-hook-form";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import { FormControl, FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { TextFieldFormControl } from "./atoms/TextFieldController";
import { HttpStatus, radioBtnEnum } from "@/enums";
import postData from "@/services/PostData";
import { useRouter } from 'next/navigation'
import { useDispatch } from "react-redux";
import { increment } from "@/redux/features/counter";

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


    const radioBtnList = [
        {
            id: radioBtnEnum.fibo,
            value: "Fibonacci (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89)",
        },
        {
            id: radioBtnEnum.shortFibo,
            value: "Short Fibonacci (0, ½, 1, 2, 3, 5, 8, 13, 20, 40, 100)",
        },
        {
            id: radioBtnEnum.shirt,
            value: "T-Shirt (XXS, XS, S, M, L, XL, XXL)",
        },
        {
            id: radioBtnEnum.shirtNumber,
            value: "T-Shirt & Numbers (S, M, L, XL, 1, 2, 3, 4, 5)",
        },
        {
            id: radioBtnEnum.custom,
            value: "Custom",
        },
    ]

    const [selectedTab, setSelectedTab] = useState<number>(0);
    const [selectedRadio, setSelectedRadio] = useState<number>(radioBtnList[0].id);
    const router: any = useRouter();

    const createNewSession = async (formValues: any) => {
        const params: any = {
            username: formValues.yourName,
            roomName: formValues.roomName,
            estimationMethodId: selectedRadio
        }

        try {
            const response = await postData("/UserRoom/FirstCreateUserRoom", params);
            if (response.status == HttpStatus.OK) {

                var roomId = response.data.roomUniqId;
                router.push(`/session/${roomId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const postJoinSession = async (formValues: any) => {
        dispatch(increment());
        // const params: any = {
        //     username: formValues.yourName,
        //     roomUniqId: formValues.sessionId
        // }

        // try {
        //     const response = await postData("/UserRoom/CreateUserRoom", params);
        //     if (response.status == HttpStatus.OK) {

        //         router.push(`/session/${formValues.sessionId}`);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
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

    return (
        <div className="w-full flex flex-col items-center mt-10">
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
                                            radioBtnList.map((item: any) => {
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