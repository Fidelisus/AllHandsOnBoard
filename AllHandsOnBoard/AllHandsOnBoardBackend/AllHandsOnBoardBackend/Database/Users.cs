using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class Users
    {
        public Users()
        {
            TaskAggregation = new HashSet<TaskAggregation>();
            TasksValidated = new HashSet<TasksValidated>();
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
        public string Password { get; set; }
        public string Token { get; set; }

        public virtual ICollection<TaskAggregation> TaskAggregation { get; set; }
        public virtual ICollection<TasksValidated> TasksValidated { get; set; }
    }
}
