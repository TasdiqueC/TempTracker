export class TempTracker {
  private temperaturesAndCounts: { [temperature: number]: number };
  private max: number;
  private min: number;
  private average: number;
  private mode: number;

  constructor() {
    this.temperaturesAndCounts = {};
  }

  public getMax() {
    return this.max;
  }

  public getMin() {
    return this.min;
  }

  public getAverage() {
    return this.average;
  }

  public getMode() {
    return this.mode;
  }

  public insertTemperature(temperature: number) {
    const previousCountOfTemperature = this.temperaturesAndCounts[temperature] // O(1)
      ? this.temperaturesAndCounts[temperature]
      : 0;
    const newCountOfTemperature = previousCountOfTemperature + 1; // O(1)
    this.temperaturesAndCounts[temperature] = newCountOfTemperature; // O(1)

    this.updateMinAndMax(temperature);

    this.updateStatisticMetrics();
  }

  private updateStatisticMetrics() {
    const temps = Object.keys(this.temperaturesAndCounts).map((a: string) =>
      Number(a)
    ); // O(n)
    this.updateMode(temps);
    this.updateAverage(temps);
  }

  private updateMinAndMax(temp: number) {
    // O(1)
    if (this.min === undefined && this.max === undefined) {
      this.min = temp;
      this.max = temp;
    }

    if (temp < this.min) {
      this.min = temp;
    } else if (temp > this.max) {
      this.max = temp;
    }
  }

  private updateMode(temps: number[]) {
    // O(n)
    const tracker = {
      highestCount: 0,
      modalTemp: -1,
    };
    for (const temp of temps) {
      const count = this.temperaturesAndCounts[temp];
      if (count > tracker.highestCount) {
        tracker.highestCount = count;
        tracker.modalTemp = temp;
      }
    }

    this.mode = tracker.modalTemp;
  }

  private updateAverage(temps: number[]) {
    // O(n)
    const tracker = {
      sum: 0,
      count: 0,
    };
    for (const temp of temps) {
      const count = this.temperaturesAndCounts[temp];

      tracker.sum += temp * count;
      tracker.count += count;
    }

    this.average = tracker.sum / tracker.count;
  }

  public getTemps() {
    const temps = Object.keys(this.temperaturesAndCounts).map((a: string) =>
      Number(a)
    );

    const completeArray = [];
    for (const temp of temps) {
      const count = this.temperaturesAndCounts[temp];

      for (let i = 0; i < count; i++) {
        completeArray.push(temp);
      }
    }

    return completeArray.join(", ");
  }
}
