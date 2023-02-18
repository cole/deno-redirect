import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import redirect from "./redirect.ts";

serve(redirect);
