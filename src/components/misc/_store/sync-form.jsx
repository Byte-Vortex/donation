"use client"
import { useFormStore } from "./form-store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { isEqual } from "lodash";

export function SyncForm({ setValue, control, getValues, formKey }) {

    const setFormValues = useFormStore((state) => state.actions.setFormValues);
    const formValues = useFormStore((state) => state.formValues?.[formKey]);
    const [mounted, setMounted] = useState(false);

    const values = useWatch({ control });

    useEffect(() => {
        if (!formValues?.values) return;
        const expiry = new Date(formValues.expiry);
        if (expiry < new Date()) return;
        setTimeout(() => {
            Object.entries(formValues.values).forEach(([key, val]) => {
                setValue(key, val);
            })
        }, 0)

    }, [formValues, setValue]);



    useEffect(() => {
        if (!mounted) {
            setMounted(true);
            return;
        }

        const newValues = getValues();
        if (isEqual(newValues, formValues?.values)) return;
        setFormValues(formKey, newValues)

    }, [values, formKey, getValues])


    return null;

}