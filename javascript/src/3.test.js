import { readFile, writeFileSync } from 'fs';

class RollCall {
  constructor() {
    this.roll = {
      [this.today()]: {
        present: [],
        absent: [],
      },
    };
  }

  today = () => new Date().toISOString().slice(0, 10);

  getRoll = () => this.roll;

  studentCheckin = (name, present) => {
    if (present) {
      this.roll[this.today()].present.push(name);
    } else {
      this.roll[this.today()].absent.push(name);
    }
  };

  saveToFile = () => writeFileSync('support/roll_log.md', this.formattedRoll());

  rollPercentage = (grouping) => {
    const totalStudents = this.roll[this.today()].present.length
      + this.roll[this.today()].absent.length;
    const presentPercent = (this.roll[this.today()].present.length / totalStudents) * 100.0;

    if (grouping === 'present') {
      return presentPercent;
    }

    return 100 - presentPercent;
  };

  formattedRoll = () => (
    `## Roll call for ${this.today()}
### ${this.rollPercentage('present')}% Present
${this.roll[this.today()].present.join(', ')}
### ${this.rollPercentage('absent')}% Absent
${this.roll[this.today()].absent.join(', ')}
#{'-' * 42}`
  );
}

function instance() {
  const rc = new RollCall();
  rc.studentCheckin('Ryan', true);
  rc.studentCheckin('Chase', true);
  rc.studentCheckin('KJ', true);
  rc.studentCheckin('Hunter', false);
  rc.studentCheckin('Devan', false);
  rc.studentCheckin('Zach', true);
  rc.studentCheckin('Ben', true);
  rc.studentCheckin('Stephanie', true);
  rc.studentCheckin('Ian', true);
  rc.studentCheckin('Alex', true);
  rc.studentCheckin('Cody', true);
  rc.studentCheckin('Preston', true);
  rc.studentCheckin('Andrew', true);
  rc.studentCheckin('Jason', true);
  rc.studentCheckin('Christian', false);
  return rc;
}

describe('RollCall', () => {
  it('can take roll for students and return a hash that lists the students that were present and absent', () => {
    const rc = instance();
    expect(rc.getRoll()).toEqual({
      '2019-08-07': {
        present: [
          'Ryan',
          'Chase',
          'KJ',
          'Zach',
          'Ben',
          'Stephanie',
          'Ian',
          'Alex',
          'Cody',
          'Preston',
          'Andrew',
          'Jason',
        ],
        absent: [
          'Hunter',
          'Devan',
          'Christian',
        ],
      },
    });
  });

  it('can give a percent of absent and present', () => {
    const rc = instance();
    expect(rc.rollPercentage('present')).toEqual(80.0);
    expect(rc.rollPercentage('absent')).toEqual(20.0);
  });

  it('appends the daily roll call to a file', () => {
    const rc = instance();
    rc.saveToFile();
    const checkContent = `
      ## Roll call for 2018-08-06
      ### 80.0% Present
      Ryan, Chase, KJ, Zach, Ben, Stephanie, Ian, Alex, Cody, Preston, Andrew, Jason
      ### 20.0% Absent
      Hunter, Devan, Christian
      ------------------------------------------
    `;
    readFile('support/roll_log.md', 'utf8', (err, contents) => {
      expect(contents).toEqual(checkContent);
    });
  });
});
