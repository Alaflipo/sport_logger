import { Autocomplete, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { ActivityData, PersonalActivityData } from "../DataTypes";

const RowStyle = {
    width: "350px",
    textAlign: "left",
    margin: "10px auto",
};

interface RowStackProps {
    label: string | undefined;
    var: keyof ActivityData | keyof PersonalActivityData;
    placeholder: string | undefined;
    value: string | number | undefined;
    multiline?: boolean;
    options?: any;
    data: any;
    setData: any;
}

const RowStack = (props: RowStackProps) => {
    function updateActivity(key: any, value: any) {
        let newActivity = { ...props.data };
        newActivity[key] = value;
        props.setData(newActivity);
    }

    return (
        <Stack
            direction="row"
            alignItems="baseline"
            justifyContent={"space-between"}
            sx={RowStyle}
            spacing={1}
        >
            <Typography variant="body1">{props.label}</Typography>
            {props.options ? (
                <Autocomplete
                    options={props.options.map((option: any) => option.label)}
                    onChange={(event, value: any) => {
                        let lib = props.options.filter(
                            (item: any) => item.label === value
                        );
                        console.log(lib);
                        updateActivity(props.var, lib[0].id);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            sx={{ width: 200 }}
                            label={props.value}
                            placeholder={props.placeholder}
                            variant="outlined"
                        />
                    )}
                />
            ) : (
                <TextField
                    label={props.value}
                    sx={{ width: 200 }}
                    placeholder={props.placeholder}
                    multiline={props.multiline}
                    rows={props.multiline ? 2 : 1}
                    variant="outlined"
                    onChange={(e) => {
                        updateActivity(props.var, e.target.value);
                    }}
                />
            )}
        </Stack>
    );
};

export default RowStack;
