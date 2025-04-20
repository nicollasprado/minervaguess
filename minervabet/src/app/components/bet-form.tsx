"use client";

import BetGroup from "./bet-group";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import H2 from "@/components/H2";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  handleCheckAssists,
  handleCheckDeaths,
  handleCheckKills,
  handleCheckResult,
} from "@/utils/handleBetOptionsClick";

const formSchema = z.object({
  killHigh: z.boolean().optional(),
  killLow: z.boolean().optional(),
  killSpecific: z
    .string()
    .min(0, { message: "O mínimo é 0 abates" })
    .max(30, { message: "O máximo é 30 abates" })
    .optional(),
  assistHigh: z.boolean().optional(),
  assistLow: z.boolean().optional(),
  assistSpecific: z
    .string()
    .min(0, { message: "O mínimo é 0 assistencias" })
    .max(40, { message: "O máximo é 40 assistencias" })
    .optional(),
  deathHigh: z.boolean().optional(),
  deathLow: z.boolean().optional(),
  deathSpecific: z
    .string()
    .min(0, { message: "O mínimo é 0 mortes" })
    .max(20, { message: "O máximo é 20 mortes" })
    .optional(),
  win: z.boolean().optional(),
  lose: z.boolean().optional(),
  points: z.coerce
    .number({ invalid_type_error: "A aposta mínima é de 1 ponto" })
    .min(1, "A aposta mínima é de 1 ponto"),
});

export type BetFormSchema = z.infer<typeof formSchema>;

export default function BetForm() {
  const [multipliers, setMultipliers] = useState<[string, number][]>([
    ["kill", 0],
    ["assist", 0],
    ["death", 0],
    ["result", 0],
  ]);

  const form = useForm<BetFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      killHigh: false,
      killLow: false,
      killSpecific: "",
      assistHigh: false,
      assistLow: false,
      assistSpecific: "",
      deathHigh: false,
      deathLow: false,
      deathSpecific: "",
      win: false,
      lose: false,
      points: 0,
    },
  });

  const onSubmit = (data: BetFormSchema) => {
    console.log(data);
  };

  const getTotalMultipliers = () => {
    let tot = 0;
    multipliers.forEach((multiplier) => {
      tot += multiplier[1];
    });

    return tot;
  };

  return (
    <section className="bg-purple-700 m-5 p-5 h-[50%] max-h-[70%]">
      <h2 className="text-neutral-300 text-center font-bold text-3xl ">
        APOSTAR
      </h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col justify-around h-[100%]"
        >
          <ul className="flex justify-around flex-wrap">
            {/* Kills */}
            <li className="flex flex-col gap-2">
              <H2 className="text-left">Abates</H2>
              <ol className="flex flex-col gap-2 items-start">
                <BetGroup
                  description="Acima de 8 - 1.5x"
                  form={form}
                  name="killHigh"
                  inputType="checkbox"
                  onChangeFunc={() =>
                    handleCheckKills("killHigh", form, setMultipliers)
                  }
                />
                <BetGroup
                  description="Abaixo de 8 - 1.3x"
                  form={form}
                  name="killLow"
                  inputType="checkbox"
                  onChangeFunc={() =>
                    handleCheckKills("killLow", form, setMultipliers)
                  }
                />
                <BetGroup
                  description="Valor extato - 2x"
                  form={form}
                  name="killSpecific"
                  inputType="text"
                  onChangeFunc={() =>
                    handleCheckKills("killSpecific", form, setMultipliers)
                  }
                />
              </ol>
            </li>
            {/* assists */}
            <li className="flex flex-col gap-2">
              <H2 className="text-left">Assistências</H2>
              <ol className="flex flex-col gap-2 items-start">
                <li>
                  <BetGroup
                    description="Acima de 10 - 1.4x"
                    form={form}
                    name="assistHigh"
                    inputType="checkbox"
                    onChangeFunc={() =>
                      handleCheckAssists("assistHigh", form, setMultipliers)
                    }
                  />
                </li>
                <li>
                  <BetGroup
                    description="Abaixo de 10 - 1.3x"
                    form={form}
                    name="assistLow"
                    inputType="checkbox"
                    onChangeFunc={() =>
                      handleCheckAssists("assistLow", form, setMultipliers)
                    }
                  />
                </li>
                <li>
                  <BetGroup
                    description="Valor extato - 2x"
                    form={form}
                    name="assistSpecific"
                    inputType="text"
                    onChangeFunc={() =>
                      handleCheckAssists("assistSpecific", form, setMultipliers)
                    }
                  />
                </li>
              </ol>
            </li>
            {/* deaths */}
            <li className="flex flex-col gap-2">
              <H2 className="text-left">Mortes</H2>
              <ol className="flex flex-col gap-2 items-start">
                <li>
                  <BetGroup
                    description="Acima de 5 - 1.4x"
                    form={form}
                    name="deathHigh"
                    inputType="checkbox"
                    onChangeFunc={() =>
                      handleCheckDeaths("deathHigh", form, setMultipliers)
                    }
                  />
                </li>
                <li>
                  <BetGroup
                    description="Abaixo de 5 - 1.6x"
                    form={form}
                    name="deathLow"
                    inputType="checkbox"
                    onChangeFunc={() =>
                      handleCheckDeaths("deathLow", form, setMultipliers)
                    }
                  />
                </li>
                <li>
                  <BetGroup
                    description="Valor extato - 2x"
                    form={form}
                    name="deathSpecific"
                    inputType="text"
                    onChangeFunc={() =>
                      handleCheckDeaths("deathSpecific", form, setMultipliers)
                    }
                  />
                </li>
              </ol>
            </li>
            {/* final result */}
            <li className="flex flex-col gap-2">
              <H2 className="text-left">Resultado final</H2>
              <ol className="flex flex-col gap-2 items-start">
                <li>
                  <BetGroup
                    description="Vitória - 2x"
                    form={form}
                    name="win"
                    inputType="checkbox"
                    onChangeFunc={() =>
                      handleCheckResult("win", form, setMultipliers)
                    }
                  />
                </li>
                <li>
                  <BetGroup
                    description="Derrota - 2x"
                    form={form}
                    name="lose"
                    inputType="checkbox"
                    onChangeFunc={() =>
                      handleCheckResult("lose", form, setMultipliers)
                    }
                  />
                </li>
              </ol>
            </li>
          </ul>

          <div className="flex justify-center">
            <div className="flex flex-col gap-3">
              <div className="flex items-baseline-last gap-2">
                <FormField
                  control={form.control}
                  name="points"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-neutral-300">
                        Quantidade de pontos:
                      </FormLabel>
                      <FormControl>
                        <input
                          type="number"
                          className="bg-neutral-300 text-black text-lg text-center rounded-sm w-50 h-10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <p className="font-bold text-green-400">
                  {getTotalMultipliers()}x
                </p>
              </div>

              <Button className="bg-green-500 text-black text-xl text-bold w-60 h-15">
                APOSTAR
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
