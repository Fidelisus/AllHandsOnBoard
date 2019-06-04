using System;
using System.Collections.Generic;

namespace AllHandsOnBoardBackend
{
    public partial class UserRating
    {
        public int Ratingid { get; set; }
        public int? UserId { get; set; }
        public double? Rating { get; set; }

        public virtual Users User { get; set; }
    }
}
