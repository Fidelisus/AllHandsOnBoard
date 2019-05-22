using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class Tags
    {
        public Tags()
        {
            TaskTags = new HashSet<TaskTags>();
        }

        public int TagId { get; set; }
        public string TagDescription { get; set; }

        public virtual ICollection<TaskTags> TaskTags { get; set; }
    }
}
