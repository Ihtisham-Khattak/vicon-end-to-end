import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "30s", target: 50 },
    { duration: "60s", target: 150 },
  ]
};

export default function () {
  const url = "https://dev.metodovicon.com/api/user";
  http.get(url);
  sleep(1);
}
