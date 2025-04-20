import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export function handleCheckKills(
  fieldId: "killHigh" | "killLow" | "killSpecific",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;
  if (fieldId === "killHigh") {
    form.setValue("killLow", false);
    form.setValue("killSpecific", "");
    multiplier = 1.5;
  } else if (fieldId === "killLow") {
    form.setValue("killHigh", false);
    form.setValue("killSpecific", "");
    multiplier = 1.3;
  } else if (fieldId === "killSpecific") {
    form.setValue("killHigh", false);
    form.setValue("killLow", false);
    multiplier = 2;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, Number(currentValue));

  if (currentValue === false || currentValue === "") {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "kill"
    );

    return [["kill", multiplier], ...newMultipliers];
  });
}

export function handleCheckDeaths(
  fieldId: "deathHigh" | "deathLow" | "deathSpecific",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;

  if (fieldId === "deathHigh") {
    form.setValue("deathLow", false);
    form.setValue("deathSpecific", "");
    multiplier = 1.4;
  } else if (fieldId === "deathLow") {
    form.setValue("deathHigh", false);
    form.setValue("deathSpecific", "");
    multiplier = 1.6;
  } else if (fieldId === "deathSpecific") {
    form.setValue("deathHigh", false);
    form.setValue("deathLow", false);
    multiplier = 2;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, Number(currentValue));

  if (currentValue === false || currentValue === "") {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "death"
    );

    return [["death", multiplier], ...newMultipliers];
  });
}

export function handleCheckAssists(
  fieldId: "assistHigh" | "assistLow" | "assistSpecific",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;
  if (fieldId === "assistHigh") {
    form.setValue("assistLow", false);
    form.setValue("assistSpecific", "");
    multiplier = 1.4;
  } else if (fieldId === "assistLow") {
    form.setValue("assistHigh", false);
    form.setValue("assistSpecific", "");
    multiplier = 1.3;
  } else if (fieldId === "assistSpecific") {
    form.setValue("assistHigh", false);
    form.setValue("assistLow", false);
    multiplier = 2;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, Number(currentValue));

  if (currentValue === false || currentValue === "") {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "assist"
    );

    return [["assist", multiplier], ...newMultipliers];
  });
}

export function handleCheckResult(
  fieldId: "win" | "lose",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>,
  setMultipliers: Dispatch<SetStateAction<[string, number][]>>
) {
  let multiplier = 0;
  if (fieldId === "win") {
    form.setValue("lose", false);
    multiplier = 2;
  } else if (fieldId === "lose") {
    form.setValue("win", false);
    multiplier = 2;
  }

  const currentValue = form.getValues(fieldId);
  form.setValue(fieldId, Number(currentValue));

  if (currentValue === false) {
    multiplier = 0;
  }

  setMultipliers((oldMultipliers) => {
    const newMultipliers = oldMultipliers.filter(
      (multiplier) => multiplier[0] != "result"
    );

    return [["result", multiplier], ...newMultipliers];
  });
}
