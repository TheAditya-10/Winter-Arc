"use client"

import { Card, CardContent, CardAction, CardHeader, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "./ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { registerForChallenge } from "@/app/actions"
import { useState } from "react"
import { toast } from "sonner"


const ChallengeDetail = ({ tasks, challenge }) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    const loadToast = toast.loading("loading ...")
    try {
      const {message, error} = await registerForChallenge(challenge.id)
      if(error) {
        toast.error(message)
      } else {
        toast.success(message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Some thing went wrong. Please try again later!!")
    } finally {
      toast.dismiss(loadToast)
      setIsLoading(false)
    }
  }


  return (
    <section className="bg-background pb-32 pt-10">
      <div className="">
        <h1 className="text-foreground px-2 mb-10 text-center text-3xl font-bold tracking-tighter @sm/main:text-5xl">
          {challenge.title}
        </h1>
        <div className="text-foreground @lg/main:px-8 px-2 mb-10 max-w-4xl mx-auto">
          <Card className="@max-xl/main:py-3">
            <CardContent className="@max-xl/main:px-4">
              <p className="prose dark:prose-invert text-foreground">
                {challenge.description}
              </p>
              <div className="@xl/main:mt-6 mt-3 flex justify-center">
                <Button onClick={handleClick} disabled={isLoading}>Start Now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="relative mx-auto max-w-4xl px-2">
          <h2 className="rounded-xl text-2xl font-bold tracking-tight @5xl/main:mb-4 mb-2">Daliy Tasks</h2>
          <Separator
            orientation="vertical"
            className="bg-muted absolute left-4 top-16"
          />
          {tasks.map((task, index) => (
            <div key={index} className="relative mb-10 pl-8">
              <div className="border-foreground border-2 bg-primary-foreground absolute left-0 top-6 flex size-4 items-center justify-center rounded-full" />

              {/* <h5 className="text-md -left-34 @xl/main:px-3 text-muted-foreground top-3 rounded-xl tracking-tight @5xl/main:absolute flex justify-between">
                Day {task.day_number}
              </h5> */}

              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <h4 className="rounded-xl text-xl font-bold tracking-tight @5xl/main:mb-2 @xl/main:px-3">
                      {task.title}
                    </h4>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Card className="my-5 border-none shadow-none">
                      <CardContent className="px-2">
                        <div
                          className="prose dark:prose-invert text-foreground"
                        >
                          {task.description}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex w-full justify-end">
                          <Button>Submit</Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Tasks };
