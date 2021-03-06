﻿using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class TaskAggregation
    {
        public int UserId { get; set; }
        public int TaskId { get; set; }

        public virtual Tasks Task { get; set; }
        public virtual Users User { get; set; }
    }
}
