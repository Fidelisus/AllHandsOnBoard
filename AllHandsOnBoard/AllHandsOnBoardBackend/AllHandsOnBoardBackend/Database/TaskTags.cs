using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class TaskTags
    {
        public int TaskId { get; set; }
        public int TagId { get; set; }

        public virtual Tags Tag { get; set; }
        public virtual Tasks Task { get; set; }

        
    }
}
