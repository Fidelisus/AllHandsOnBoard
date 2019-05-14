using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class Users
    {
        public Users()
        {
            TaskAggregation = new HashSet<TaskAggregation>();
            Tasks = new HashSet<Tasks>();
        }

        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Occupation { get; set; }
        public int? IndexNo { get; set; }
        public string AcademicTitle { get; set; }
        public string Department { get; set; }
        public int? Points { get; set; }

        public string Token {get;set;}
        public string Password {get;set;}
        public ICollection<TaskAggregation> TaskAggregation { get; set; }
        public ICollection<Tasks> Tasks { get; set; }
    }
}
