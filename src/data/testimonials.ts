/**
 * PLACEHOLDER REVIEWS — DO NOT PUBLISH AS-IS.
 * These three lines exist only to show the card layout during development.
 * Replace each one with a genuine, attributable customer review before launch.
 * Never invent names, star ratings, "verified" badges or Google review counts.
 */
export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  context: string;
  service: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    quote: "The fade was clean and the finish was exactly what I wanted.",
    author: "Customer Review Placeholder",
    context: "Replace with a genuine review before publishing",
    service: "Mid Fade",
  },
  {
    id: "t2",
    quote: "Good service, clean environment and a very professional cut.",
    author: "Customer Review Placeholder",
    context: "Replace with a genuine review before publishing",
    service: "Classic Haircut",
  },
  {
    id: "t3",
    quote: "I came for a simple haircut and left looking completely fresh.",
    author: "Customer Review Placeholder",
    context: "Replace with a genuine review before publishing",
    service: "Haircut + Beard",
  },
];

export const testimonialsDisclaimer =
  "Review cards above are editable placeholders. Add real customer feedback only — no invented ratings, stars or review counts.";
