using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class Tasks
    {
        public Tasks()
        {
            TaskAggregation = new HashSet<TaskAggregation>();
            TaskTags = new HashSet<TaskTags>();
            TasksValidated = new HashSet<TasksValidated>();
        }

        public int TaskId { get; set; }
        public string Stateoftask { get; set; }
        public int? UploaderId { get; set; }
        public string ShortDescription { get; set; }
        public string TaskDescription { get; set; }
        public int PointsGained { get; set; }
        public DateTime WorkStartDate { get; set; }
        public DateTime? WorkFinishDate { get; set; }
        public DateTime? SigningFinishDate { get; set; }
        public DateTime? UploadDate { get; set; }
        public int NoOfStudents { get; set; }

        public virtual ICollection<TaskAggregation> TaskAggregation { get; set; }
        public virtual ICollection<TaskTags> TaskTags { get; set; }
        public virtual ICollection<TasksValidated> TasksValidated { get; set; }
    }
}
