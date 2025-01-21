// 存储游戏数据

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export class GameData {
  // 分数
  private static _score: number = 0;

  private static readonly SCORE: string = 'BaseScore';

  // 增加分数
  public static addScore(count: number = 1) {
    this._score += count;

    // 保存最高分
    this.saveBestScore();
  }

  // 获取分数
  public static getScore(): number {
    return this._score;
  }

  // 获取最高分
  public static getBestScore(): number {
    let bestScore = localStorage.getItem(this.SCORE);
    if (bestScore) {
      return parseInt(bestScore);
    } else {
      return 0;
    }
  }

  // 保存最高分
  public static saveBestScore() {
    let bestScore = this.getBestScore();
    if (this._score > bestScore) {
      localStorage.setItem(this.SCORE, this._score.toString());
    }
  }

  // 重置分数
  public static reset() {
    this._score = 0;
  }
}
