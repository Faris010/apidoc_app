using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Dtos.SectionDtos
{
    public class AddSectionDto
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        [ForeignKey("Project")]
        public int ProjectId { get; set; }
        public ICollection<Section>? Children { get; set; }
    }
}