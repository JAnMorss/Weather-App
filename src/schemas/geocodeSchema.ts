import z from "zod";

const GeocodeSchema = z.array(
  z.union([
    z.object({
      name: z.string(),
      lat: z.number(),
      lon: z.number(),
      country: z.string(),
    }),
    z.object({
      display_name: z.string(),
      lat: z.string().transform(Number),
      lon: z.string().transform(Number),
    }),
  ])
);


export default GeocodeSchema;