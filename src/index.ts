// ignore file coverage
import {createGame} from './core';
import $ from 'jquery';

const can = $(`<canvas width='800' height='600' />`);
// @ts-ignore
$('body').html(can);
createGame(can);
