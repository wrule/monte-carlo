import React from 'react';
import style from './index.module.scss';
import { Chart } from '@antv/g2';

export
class Lines extends React.Component {
  public render() {
    return <div className={style.com}>
    </div>;
  }

  private get el() {
    return document.querySelector(`.${style.com}`);
  }

  private chart!: Chart;

  private dataSource: number[] = [
    -12.31375297747644,    28.7987892909472,
    346.21624750195605,  -2.939287525966582,
    20.275529293965196, -13.377769766673945,
    -7.263068023864612,   2.051829771679218,
    -8.186186309061771,   5.667905965694245,
     61.40511478604756, -1.4211355153256011,
      4.90912027110079,   36.86767307738814,
     32.64169930611621,  20.698062222114284,
    117.17030321355475,  31.512466995057647,
    224.37694260171358,  -8.464697747766744,
   -0.9200370221347896,  -12.38641848509021,
   -14.586091796486542, -0.5749365984498653,
    -5.117359344769109,  191.55766738226217,
   -14.663500133833352, -10.098545470110968,
    11.179774633278573,   36.54125406025136,
   -3.8587972321373396,   9.782179768137894,
    356.38969981644243,   19.02550935712151,
      7.40081364761237
 ];
  private initFunds: number = 100;

  private multiply(
    initFunds: number,
    profitRates: number[],
  ) {
    const result: number[] = [initFunds];
    let prevFunds = initFunds;
    profitRates.forEach((profitRate) => {
      const newFunds = prevFunds * ((100 + profitRate) / 100);
      result.push(newFunds);
      prevFunds = newFunds;
    });
    return result;
  }

  private coordinate(
    nums: number[],
    id: string = '',
  ) {
    return nums.map((num, index) => ({ x: index + 1, y: num, type: id, }));
  }

  private randomize(nums: number[]) {
    return nums.map(() => nums[Math.floor(Math.random() * nums.length)]);
  }

  private montecarlo(
    nums: number[],
    size: number,
  ) {
    const result: any[] = [];
    for (let i = 0; i < size; ++i) {
      const data = this.coordinate(this.multiply(100, this.randomize(nums)), i.toString());
      result.push(...data);
    }
    return result;
  }

  public componentDidMount() {
    const data = this.montecarlo(this.dataSource, 1000);
    this.chart = new Chart({
      container: this.el as HTMLElement,
      autoFit: true,
      height: 1000,
    });
    this.chart.data(data);
    this.chart.scale({
      y: {
        type: 'pow',
        // max: 500000,
        // min: 250000,
        nice: true,
      },
    });
    this.chart.line().position('x*y').color('type', 'blue').style({
      opacity: 0.05,
    }).size(1);
    this.chart.render();
    console.log('渲染结束');
  }
}
