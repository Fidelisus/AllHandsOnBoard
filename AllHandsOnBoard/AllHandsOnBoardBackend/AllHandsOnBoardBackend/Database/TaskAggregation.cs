using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class TaskAggregation
    {
        public int AggegationId { get; set; }
        public int? UserId { get; set; }
        public int? TaskId { get; set; }

        public Tasks Task { get; set; }
        public Users User { get; set; }
    }
}
