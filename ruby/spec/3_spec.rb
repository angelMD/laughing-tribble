class RollCall
  def roll
  end

  def student_checkin(name, present)
  end

  def save_to_file
  end

  def roll_percentage(grouping)
  end

end

describe RollCall do
  before do
    @rc = RollCall.new
    @rc.student_checkin('Ryan', true)
    @rc.student_checkin('Chase', true)
    @rc.student_checkin('KJ', true)
    @rc.student_checkin('Hunter', false)
    @rc.student_checkin('Devan', false)
    @rc.student_checkin('Zach', true)
    @rc.student_checkin('Ben', true)
    @rc.student_checkin('Stephanie', true)
    @rc.student_checkin('Ian', true)
    @rc.student_checkin('Alex', true)
    @rc.student_checkin('Cody', true)
    @rc.student_checkin('Preston', true)
    @rc.student_checkin('Andrew', true)
    @rc.student_checkin('Jason', true)
    @rc.student_checkin('Christian', false)
  end

  it 'can take roll for students and return a hash that lists the students that were present and absent' do
    expect(@rc.roll).to eq(
      {
        "2018-08-06"=>
        {
          :present=>[
            "Ryan",
            "Chase",
            "KJ",
            "Zach",
            "Ben",
            "Stephanie",
            "Ian",
            "Alex",
            "Cody",
            "Preston",
            "Andrew",
            "Jason"
          ],
          :absent=>[
            "Hunter",
            "Devan",
            "Christian"
          ]
        }
      })
  end

  it 'can give a percent of absent and present' do
    expect(@rc.roll_percentage('present')).to eq(80.0)
    expect(@rc.roll_percentage('absent')).to eq(20.0)
  end

  it 'appends the daily roll call to a file' do
    @rc.save_to_file
    content = <<~CONTENT
      ## Roll call for 2018-08-06
      ### 80.0% Present
      Ryan, Chase, KJ, Zach, Ben, Stephanie, Ian, Alex, Cody, Preston, Andrew, Jason
      ### 20.0% Absent
      Hunter, Devan, Christian
      ------------------------------------------
    CONTENT
    expect(File.read('support/roll_log.md')).to match(content)
  end
end