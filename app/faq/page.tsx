import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is HxH Compare?",
      answer:
        "HxH Compare is a platform dedicated to showcasing the differences between TV broadcast and Blu-ray releases of Hunter x Hunter (2011), as well as comparing preview scenes with their final versions in the actual episodes. We provide side-by-side comparisons that highlight changes in animation quality, censorship, color grading, camera angles, and more.",
    },
    {
      question: "Why do TV and Blu-ray versions of Hunter x Hunter differ?",
      answer:
        "There are several reasons for differences between TV and Blu-ray versions. TV broadcasts often have tight production schedules, leading to rushed animation that gets fixed for Blu-ray releases. Additionally, TV versions may be censored due to broadcasting regulations, while Blu-rays can contain uncensored content. Studios also take the opportunity to enhance visual quality, fix animation errors, and sometimes add new scenes for the home media release.",
    },
    {
      question: "Why do preview scenes differ from the actual episode scenes?",
      answer:
        "Preview scenes shown at the end of episodes often differ from the final versions because they're created while the next episode is still in production. The animation team may continue refining the scenes, adjust camera angles, improve lighting, or even change entire shots before the episode is finalized. These differences provide a fascinating glimpse into the anime production process.",
    },
    {
      question: "How do I use the comparison tools?",
      answer:
        "Our comparison tools are designed to be intuitive. When viewing a comparison, you can choose between TV vs Blu-ray or Preview vs Actual comparisons. You can use the slider to reveal differences, view scenes side by side, toggle between versions, or watch animated GIF comparisons. Each comparison also includes annotations highlighting key differences.",
    },
    {
      question: "Which arcs of Hunter x Hunter are covered?",
      answer:
        "We cover all six major arcs of Hunter x Hunter (2011): Hunter Exam, Zoldyck Family, Heavens Arena, Yorknew City, Greed Island, and Chimera Ant. We're constantly adding new comparisons across all arcs.",
    },
    {
      question: "How often is new content added?",
      answer:
        "We add new comparisons weekly, focusing on both popular scenes and lesser-known moments with interesting differences. Follow us on social media or subscribe to our newsletter to stay updated on new additions.",
    },
    {
      question: "Are the comparisons available in high resolution?",
      answer:
        "Yes, all our comparisons use high-resolution screenshots to ensure you can see even the smallest differences. We typically use 1080p sources for both TV and Blu-ray versions whenever possible.",
    },
    {
      question: "Do you cover the 1999 version of Hunter x Hunter?",
      answer:
        "Currently, we focus exclusively on the 2011 version of Hunter x Hunter by Madhouse. We may expand to include comparisons with the 1999 version in the future.",
    },
    {
      question: "How do you obtain the source material?",
      answer:
        "We use legally obtained TV broadcasts and purchased Blu-ray discs for all our comparisons. We do not use or support pirated content.",
    },
    {
      question: "Can I contribute to HxH Compare?",
      answer:
        "We're always looking for passionate Hunter x Hunter fans to join our team! If you have experience in video capture, image editing, or anime analysis, please reach out through our contact page.",
    },
    {
      question: "Is there a mobile app available?",
      answer:
        "Currently, we offer a responsive website that works well on mobile devices. A dedicated mobile app is in our development roadmap for the future.",
    },
  ]

  return (
    <div className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Find answers to common questions about our platform and how to use it.
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="mt-16 mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-bold tracking-tighter mb-4">Still Have Questions?</h2>
        <p className="text-muted-foreground mb-6">
          If you couldn't find the answer you were looking for, feel free to contact us directly.
        </p>
        <div className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          Contact Us
        </div>
      </div>
    </div>
  )
}

