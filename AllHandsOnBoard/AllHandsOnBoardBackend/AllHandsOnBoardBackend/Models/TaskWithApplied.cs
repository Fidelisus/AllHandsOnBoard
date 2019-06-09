using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AllHandsOnBoardBackend.Models
{
    public class TaskWithApplied
    {
        public TaskWithApplied(){
            tags = new List<string>();
            Applied = new Dictionary<string,object>();
        }

        public Tasks task { get; set; }
        public string UploaderSurname { get; set; }
        public string UploaderName { get; set; }
        public string UploaderEmail { get; set; }
        public List<string> tags { get; set; }
        public Dictionary<string,object> Applied {get;set;}
    }
}
