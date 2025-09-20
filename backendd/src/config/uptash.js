import {Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis"

const redis=new Redis({
url:"https://still-hen-12450.upstash.io",
token:"ATCiAAIncDEyNTBlNWFlNDViMjY0NWUyYjk4MGQ3NjhlMGU0NTI5MHAxMTI0NTA"


});

const ratelimit=new Ratelimit({
redis,
limiter:Ratelimit.slidingWindow(20,"10 s"),



})
export default ratelimit;