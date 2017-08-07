import { Component, OnInit } from '@angular/core';

export interface Frequency {
  letter: string,
  frequency: number,
}

export const letterStart = ["CN", "NG", "QA", "EG", "CZ", "HU", "HR", "SI", "IT", "PN"];

function getPositiveRandomArbitrary() {
  return Math.floor(Math.random() * 100) + 17
}

function getNegativeRandomArbitrary() {
  return Math.random() * (-100 - 0) + 0
}

setInterval(function () {
    updateStatistic ()
}, 1000);

export const STATISTICS: Frequency[] =[{letter: "", frequency: 0}];

function updateStatistic () {
  for(var i = 0; i < 5; i++) {
      STATISTICS[i] = ({letter: letterStart[i], frequency: getPositiveRandomArbitrary()});

  }

  for(var i = 5; i < 10; i++) {
      STATISTICS[i] = ({letter: letterStart[i], frequency: getNegativeRandomArbitrary()});
  }
  }
