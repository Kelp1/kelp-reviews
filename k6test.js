import {check, sleep} from 'k6';
import http from 'k6/http';

export default function() {
  let res = http.get('http://http://34.219.64.53/')
}