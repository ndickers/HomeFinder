"use client";
import React, { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useRouter } from "next/navigation";
import { useFormContext } from "./FormContext";

const steps = ["Basic", "Location", "Financial", "Images", "Publish"];

const basicSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  type: Yup.string().required("Property type is required"),
});

function LocationStep() {
  return (
    <div className="max-w-[400px] mx-auto my-6">
      <div className="flex gap-4">
        <Input placeholder="location" name="location" id="location" />
        <Button className="">Get location</Button>
      </div>
      <div></div>
    </div>
  );
}

export default function FormWizard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { state, dispatch } = useFormContext();
  const params = useParams();
  const propertyId = params.propertyId;
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: state?.title || "",
      description: state?.description || "",
      type: state?.type || "",
    },
    resolver: yupResolver(basicSchema),
  });
  type FormData = Yup.InferType<typeof basicSchema>;
  const onSubmit = (data: FormData) => {
    setIsSubmitting(true);
    dispatch({ type: "UPDATE_BASIC", payload: data });
    startTransition(() => {
      router.push(`/agent/properties/create/${propertyId}/location`);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <div className="my-4">
          <label htmlFor="title">Title </label>
          <Input {...register("title")} name="title" id="title" />
          <p className="text-red-500 text-sm">
            {errors.title?.message as string}
          </p>
        </div>

        <div>
          <label htmlFor="description">Describe property</label>
          <Textarea
            {...register("description")}
            name="description"
            id="description"
          ></Textarea>
          <p className="text-red-500 text-sm">
            {errors.description?.message as string}
          </p>
        </div>
        <div>
          <label htmlFor="">Property Type </label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Property type is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <p className="text-red-500 text-sm">
            {errors.type?.message as string}
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isPending ? "Saving..." : "Next"}
        </Button>
      </form>
    </div>
  );
}
