using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class TasksValidated
    {
        public int TaskId { get; set; }
        public int UserId { get; set; }

        public virtual Tasks Task { get; set; }
        public virtual Users User { get; set; }
    }
}
