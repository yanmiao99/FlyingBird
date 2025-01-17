// 公共管理类

import { _decorator, Component, Node } from 'cc';
import { Bird } from './Bird';
import { MoveBg } from './MoveBg';
import { PipeSpawner } from './PipeSpawner';
const { ccclass, property } = _decorator;

// 游戏状态
enum GameState {
  Ready,
  Gaming,
  GameOver,
}

@ccclass('GameManager')
export class GameManager extends Component {
  private static _inst: GameManager = null; // 单例
  // 单例
  public static inst() {
    if (this._inst == null) {
      this._inst = new GameManager();
    }
    return this._inst;
  }

  // 移动速度
  @property
  moveSpeed: number = 100;

  // 引入小鸟
  @property(Bird)
  bird: Bird = null;

  // 引入背景
  @property(MoveBg)
  moveBg: MoveBg = null;

  // 引入管道
  @property(PipeSpawner)
  pipeSpawner: PipeSpawner = null;

  // 游戏状态
  curGS: GameState = GameState.Ready;

  // onLoad 会优先于 start 执行
  onLoad() {
    GameManager._inst = this;
  }

  protected start() {
    this.transitionToReadyState();
  }

  update(deltaTime: number) {}

  // 转换到准备状态
  transitionToReadyState() {
    this.curGS = GameState.Ready;
    this.bird.setCanControl(false);
    this.moveBg.setMove(false);
    this.pipeSpawner.setSpawning(false);
  }

  // 转换到游戏状态
  transitionToGamingState() {
    this.curGS = GameState.Gaming;
  }

  // 转换到结束状态
  transitionToGameOverState() {
    this.curGS = GameState.GameOver;
  }
}
